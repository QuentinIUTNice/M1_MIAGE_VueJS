<template>
  <div id="app">
    <router-link to="/" custom v-slot="{ navigate }">
      <span class="menu" id="left_button" @click="navigate" @keypress.enter="navigate" role="link">ACCUEIL</span>
    </router-link>
    <router-link to="/restaurants" custom v-slot="{ navigate }">
      <span class="menu" id="middle_button" @click="navigate" @keypress.enter="navigate" role="link">TROUVER UN RESTAURANT</span>
    </router-link>
    <router-link to="/restaurants" custom v-slot="{ navigate }">
      <span class="menu" id="right_button" @click="navigate" @keypress.enter="navigate" role="link">PANIER</span>
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
  color: black;
  width: 100%;
  
}

.menu{
  font-size: 1.5vw;
  background-color: #8B4139;
  border-style: none;
  padding: 1%;
  margin-bottom: 20%;
  position: fixed;
  z-index: 10;
}

#right_button{
  border-left: solid;
  border-bottom: solid;
  border-width: 2px;
  border-color: white;
  color:white;
  right: 0px;
  width: 34%;
}

#middle_button{
  border-left: solid;
  border-right: solid;
  border-bottom: solid;
  border-width: 2px;
  left:33%;
  border-color: white;
  color:white;
  
  width: 33%;
}

#left_button{
  border-right: solid;
  border-bottom: solid;
  border-width: 2px;
  left:0px;
  border-color: white;
  color:white;
  
  width: 33%;
}



.menu:hover{
  background-color: #8d4f48;
}
</style>
