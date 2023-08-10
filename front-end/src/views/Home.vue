<template>
  <main>
    <DrawWorkspace :socket="socket" class="workspace" />
    <Chat :socket="socket" class="chat" />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { socket } from "@/services";

  import Chat from "../components/Chat.vue";
  import DrawWorkspace from "../components/DrawWorkspace.vue";

  export default defineComponent({
    components: {
      Chat,
      DrawWorkspace
    },
    data() {
      return {
        socket
      };
    }
  });
</script>

<style scoped>
  main {
    display: flex;
    height: calc(100vh - var(--nav-height));
  }

  .workspace {
    width: calc(100vw - var(--chat-width));
    border-right: 1px solid var(--color-secondary);
  }

  .chat {
    width: var(--chat-width);
  }
</style>
