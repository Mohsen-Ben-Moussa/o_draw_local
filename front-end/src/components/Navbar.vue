<template>
  <nav>
    <a href="/" class="home">
      <img src="../assets/design-pencil.svg" alt="Icône de crayon design">
      <div>O'Draw</div>
    </a>
    <div class="navigation">
      <router-link to="/history">Historique</router-link>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--nav-height);
    border-bottom: 1px solid var(--color-primary);
  }

  img {
    width: 40px;
    margin: 0 20px;
  }

  .home {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .navigation {
    margin-right: 20px;
  }
</style>
