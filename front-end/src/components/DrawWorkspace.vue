<template>
  <div class="draw-workspace">

    <div class="grid" :style="gridTemplateColumnStyle">
      <div
        v-for="index in indexes"
        :key="index"
        :id="index.toString()"
        @click="colorize(index)"
      ></div>
    </div>

    <div class="color-picker">
      <VSwatches
        v-model="color"
        show-fallback
        fallback-input-type="color"
      />
      <div>Choisis une couleur !</div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import VSwatches from "vue3-swatches";
  import type { Pixel } from "@/types";

  const GRID_SIZE = 100;

  export default defineComponent({
    components: {
      VSwatches
    },
    props: {
      socket: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        color: "#FF00FF",
      };
    },
    created() {
      this.socket.on("retrieve-pixels", this.displayPixels);
      this.socket.on("draw", this.displayPixel);
    },
    computed: {
      gridTemplateColumnStyle() {
        return `grid-template-columns: repeat(${GRID_SIZE}, 1fr);`;
      },
      indexes() {
        return [...Array(GRID_SIZE * GRID_SIZE).keys()];
      }
    },
    methods: {
      colorize(index: number) {
        const pixel = {
          x: index % GRID_SIZE,
          y: Math.floor(index / GRID_SIZE),
          color: this.color
        };
        this.socket.emit("draw", pixel);
      },
      displayPixel(pixel: Pixel) {
        const { x, y, color } = pixel;
        const pixelElement = getPixelElement(x, y);
        pixelElement.style.backgroundColor = color;

        function getPixelElement(x: number, y: number) {
          const id = (y * GRID_SIZE + x).toString();
          return document.getElementById(id) as HTMLElement;
        }
      },
      displayPixels(pixels: Pixel[]) {
        pixels.forEach(this.displayPixel);
      }
    }
  });
</script>

<style scoped>
  .draw-workspace {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }

  .grid {
    aspect-ratio: 1 / 1;
    height: 100%;
    max-width: 100%;
    display: grid;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .color-picker {
    margin: 20px 0;
    text-align: center;
    margin: 0 0px 0px 20px;
    padding: 30px 0;
  }
</style>
