<template>
  <div id="app" style="margin-bottom: 30px">
    <div id="nav" style="margin-bottom: -40px; background-color: #000000d1">
      <router-link :to="{ name: 'Home'}" class="nav-link">Izbira uporabnika</router-link>
<!--      <router-link :to="{ name: 'Recepti' }" class="nav-link">Recepti</router-link>-->
<!--      <router-link :to="{ name: 'AddRecept' }" class="nav-link">Dodaj Recept</router-link>-->
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
  color: #156d43;
}

#nav a.router-link-exact-active {
  color: #00a75c;
}

.gap {
  margin-top: 50px;
}
</style>
