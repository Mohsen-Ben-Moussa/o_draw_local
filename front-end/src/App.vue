<template>
  <div>
    <Navbar  />

    <router-view /> <!-- This is where different pages are loaded with the vue-router. Check 'router.ts' for the existing routes -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Navbar from "./components/Navbar.vue";

  export default defineComponent({
    components: {
      Navbar
    }
  });
</script>

<style>
  /* ---- GLOBAL VARIABLE ---- */

  :root {
    --nav-height: 70px;
    --chat-width: 30%;

    --color-primary: rgb(17, 43, 60);
    --color-secondary: rgb(32, 83, 117);
    --color-tertiary: rgb(246, 107, 14);
    --color-background: rgb(239, 239, 239);
  }

  /* ---- GLOBAL STYLE ---- */

  body {
    padding: 0px;
    margin: 0px;
    color: var(--color-primary);
    background-color: var(--color-background);
    font-family: Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  button, input, textarea {
    font-family: inherit;
    background-color: none;
    color: inherit;
  }

  button {
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  input[type="text"], textarea {
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    border-width: 2px;
  }

  textarea {
    resize: none;
  }
</style>
