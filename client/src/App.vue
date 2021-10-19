<template>
  <div id="app">
    <router-link to="/" custom v-slot="{ navigate }">
      <span class="menu" id="left_button" @click="navigate" @keypress.enter="navigate" role="link">ACCUEIL</span>
    </router-link>
    <router-link to="/restaurants" custom v-slot="{ navigate }">
      <span class="menu" id="right_button" @click="navigate" @keypress.enter="navigate" role="link">TROUVER UN RESTAURANT</span>
    </router-link>

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
  font-size: 1.5vw;
  background-color: #E8694D;
  border-style: none;
  border-color: #22364b;
  padding: 1%;
  width: 50%;
  margin-bottom: 20%;
  position: fixed;
  z-index: 10;
}

#right_button{
  border-left: solid;
  border-width: 1px;
}

#left_button{
  border-right: solid;
  border-width: 1px;
  left:0px;
}

.menu:hover{
  background-color: #eb917d;
}
</style>
