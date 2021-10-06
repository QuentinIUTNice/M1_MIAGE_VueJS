<template>
  <div>
    <h1>Détail du restaurant</h1>

    <ul>
      <li>ID : {{ id }}</li>
      <li>Nom : {{ name }}</li>
      <li>Cuisine : {{ cuisine }}</li>
      <li>Ville : {{ city }}</li>
    </ul>

    <router-link to="/restaurants"
      >Retour à la liste des restaurants</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  props: {},
  data: function () {
    return {
      name: "",
      cuisine: "",
      city: "",
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    console.log("MOUNTED");
    console.log("ID : " + this.id);
    this.getRestaurantInformations();
  },
  methods: {
    getRestaurantInformations() {
      let url = "http://localhost:8080/api/restaurants/" + this.id;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((data) => {
            console.log("N : " + data.restaurant.name);
            console.log("C : " + data.restaurant.cuisine);
            this.name = data.restaurant.name;
            this.cuisine = data.restaurant.cuisine;
            this.city = data.restaurant.borough;
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
ul,
li {
  text-align: left;
}
</style>