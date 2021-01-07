<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Recepti' }" class="nav-link">Recepti</router-link>
      <router-link :to="{ name: 'Dodaj' }" class="nav-link">Dodaj Recept</router-link>
    </div>
    <transition name="fade">
      <div class="gap">
        <router-view></router-view>
      </div>
    </transition>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.gap {
  margin-top: 50px;
}
</style>
