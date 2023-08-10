<template>
  <div class="grid" :style="gridTemplateColumnStyle">
    <div
      v-for="index in indexes"
      :key="index"
      :ref="index.toString()"
    >
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Pixel } from "@/types";
  import { fetchAllPastPixels } from "@/services";

  const GRID_SIZE = 100;

  export default defineComponent({
    data() {
      return {
        pixels: new Array<Pixel>()
      };
    },
    async created() {
      this.pixels = await this.fetchPastPixels();
      this.slowlyDisplayPixels(this.pixels);
    },
    computed: {
      gridTemplateColumnStyle() {
        return `grid-template-columns: repeat(${GRID_SIZE}, 1fr);`;
      },
      indexes() {
        return Array.from(Array(GRID_SIZE * GRID_SIZE).keys());
      }
    },
    methods: {
      async fetchPastPixels() {
        return fetchAllPastPixels();
      },
      async slowlyDisplayPixels(pixels: Pixel[]) {
        pixels.forEach((pixel, index) => {
          setTimeout(this.refreshPixel, index / 2, pixel);
        });
      },
      refreshPixel(pixel: Pixel) {
        const [pixelElement] = this.$refs[`${pixel.y * GRID_SIZE + pixel.x}`] as HTMLElement[];
        pixelElement.style.backgroundColor = pixel.color;
      }
    }
  });
</script>

<style scoped>
  .grid {
    aspect-ratio: 1 / 1;

    height: calc(100vh - var(--nav-height) - 40px);
    margin: 20px auto;
    display: grid;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
</style>
