<template>
  <div id="app">
    <router-link to="/"><button class="menu">ACCUEIL</button></router-link>
    <router-link to="/restaurants"><button class="menu">TROUVER UN RESTAURANT</button></router-link>

    <br /><br />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  text-align: center;
  color: #22364b;
  margin-top: 20px;
  margin-left: 5px;
}

.menu{
  font-size: 150%;
  background-color: #E8694D;
  border-style: solid;  
  border-radius: 10px;
  border-color: #22364b;
  margin: 1%;
  padding: 1%;
}

.menu:hover{
  background-color: #eb917d;
}
</style>
