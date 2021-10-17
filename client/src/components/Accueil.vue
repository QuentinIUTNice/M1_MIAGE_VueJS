<template>
  <div>
    <h1>Bienvenue sur</h1><br>
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
  font-size: 200px;
}

small {
  display: block;
}

#site_name{
  color: #E8694D;
}

</style>