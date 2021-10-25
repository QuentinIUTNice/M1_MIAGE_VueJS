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

    <div id="map">
      <Map ref="center" />
    </div>

    <div id="carte">
      <Picture />
    </div>

    <div>
      <Video />
    </div>
    
    <br /><br />

    <div>
      <Menu />
    </div>

    <br /><br />

    <div>
      <GastronomicMenu />
    </div>
  </div>
</template>

<script>
import Map from './Map.vue';
import Picture from './Picture.vue';
import Video from './Video.vue';
import Menu from './Menu.vue';
import GastronomicMenu from './GastronomicMenu.vue';

export default {
  name: "Restaurant",
  components: {
    Map,
    Picture,
    Video,
    Menu,
    GastronomicMenu,
  },
  props: {},
  data: function () {
    return {
      name: "",
      cuisine: "",
      adresse: "",
      latitude: "",
      longitude: "",
      center: [0, 0],
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
            // Restaurant
            //
            this.restaurant = data.restaurant;
            
            // Nom du restaurant
            //
            this.name = this.restaurant.name;

            // Type de cuisine
            //
            this.cuisine = this.restaurant.cuisine;
            
            // Construction de l'adresse
            //
            this.adresse = this.restaurant.address.building + " " + 
                           this.restaurant.address.street + " " + 
                           this.restaurant.address.zipcode + " " + 
                           this.restaurant.borough;
            
            // Récpération de la latitude et de la longitude
            //
            this.latitude = this.restaurant.address.coord[1];
            this.longitude = this.restaurant.address.coord[0];

            this.center[0] = this.latitude;
            this.center[1] = this.longitude;

            this.$refs.center.center = this.center;
            
            // Récupération des avis clients
            //
            this.grades = this.restaurant.grades;

            // Transformation du format de la date des avis des clients
            //
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

#map{
  float: left;
  margin-left: 10%;
}
#carte{
  float: right;
   margin-right: 10%;
}
</style>