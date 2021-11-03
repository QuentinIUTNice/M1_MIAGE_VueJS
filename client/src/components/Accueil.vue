<template>
  <div id="acueil">
    <h1 id="bvn">Bienvenue sur</h1><br>
    <h1 id="site_name">Find a Restaurant</h1>
  </div>
</template>

<script>
export default {
  name: "Accueil",
  props: {
    msg: String,
  },
};
</script>

<style scoped>

h1{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 10vw;
  margin-top:12%;
}

small {
  display: block;
}

#site_name{
  color: #8B4139;
  font-style: oblique;
}

#bvn{
  color: #32424F;
}


</style>