<template>
  <div id="app">
    <router-link to="/"><button class="menu" id="left_button">ACCUEIL</button></router-link>
    <router-link to="/restaurants"><button class="menu" id="right_button">TROUVER UN RESTAURANT</button></router-link>

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
  
}

.menu{
  font-size: 150%;
  background-color: #E8694D;
  border-style: none;
  border-color: #22364b;
  padding: 1%;
  width: 50%;
  margin-bottom: 20px;

}

#right_button{
  border-left: solid;
  border-width: 1px;
}

#left_button{
  border-right: solid;
  border-width: 1px;
}

.menu:hover{
  background-color: #eb917d;
}
</style>
