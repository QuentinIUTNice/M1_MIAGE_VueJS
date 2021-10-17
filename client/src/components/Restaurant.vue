<template>
  <div>
    <div>
      <h1>Détail du restaurant</h1>

      <ul>
        <li>ID : {{ id }}</li>
        <li>Nom : {{ name }}</li>
        <li>Cuisine : {{ cuisine }}</li>
        <li>Adresse : {{ adresse }}</li>
        <li>
          Avis des clients :

          <md-table v-model="grades" md-sort="name" md-sort-order="asc">
            <md-table-row>
              <md-table-head>Date</md-table-head>
              <md-table-head>Note</md-table-head>
              <md-table-head>Score</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Date" md-sort-by="date">
                {{ item.date }}
              </md-table-cell>
              <md-table-cell md-label="Cuisine" md-sort-by="cuisine">
                {{ item.grade }}
              </md-table-cell>
              <md-table-cell md-label="Score" md-sort-by="score">
                {{ item.score }}
              </md-table-cell>
            </md-table-row>
          </md-table>
        </li>
      </ul>
    </div>
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
      adresse: "",
      latitude: "",
      longitude: "",
      grades: [],
      date: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getRestaurantInformations();
  },
  methods: {
    getRestaurantInformations() {
      let url = "http://localhost:8080/api/restaurants/" + this.id;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((data) => {
            this.restaurant = data.restaurant;
            this.name = this.restaurant.name;
            this.cuisine = this.restaurant.cuisine;
            this.adresse = this.restaurant.address.building + " " + 
                           this.restaurant.address.street + " " + 
                           this.restaurant.address.zipcode + " " + 
                           this.restaurant.borough;
            this.latitude = this.restaurant.address.coord[1];
            this.longitude = this.restaurant.address.coord[0];
            this.grades = this.restaurant.grades;

            for(let i = 0; i < this.grades.length; i++) {
              this.grades[i].date = this.grades[i].date.substring(0, 10);
              this.grades[i].date = this.grades[i].date.split("-")[2] + " / " + 
                                    this.grades[i].date.split("-")[1] + " / " + 
                                    this.grades[i].date.split("-")[0];
            }
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