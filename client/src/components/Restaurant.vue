<template>
  <div>
    <div id="header1">
      <h1>{{ name }}</h1>
      <h2>Type de cuisine : {{ cuisine }}</h2>
    </div>

    <div id="left-side">
      <div id="photo">
        <Picture></Picture>
      </div>
      <div id="video">
        <Video></Video>
      </div>
      
      <div id="map">
         <Map ref="center" id="carte" />
      </div>
      <div id="info">
        <p>Adresse : {{ adresse }}</p>
      </div>
    </div>

    <div id="right-side">
      <h2 id="header2">Liste des menus</h2>
      <br/>
      <v-expansion-panels id="pannel">
        <v-expansion-panel>
          <v-expansion-panel-header>Menu</v-expansion-panel-header>
          <v-expansion-panel-content>
            <Menu @rMenuPrice="setMenuPrice"/>
            <br />
            <v-btn class="addToCart" color="success"
                   @click="addMenuToCart">
              <v-icon left>mdi-cart</v-icon>
              Ajouter au panier
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Menu gastronomique</v-expansion-panel-header>
          <v-expansion-panel-content>
            <GastronomicMenu @rGastronomicMenuPrice="setGastronomicMenuPrice"/>
            <br />
            <v-btn class="addToCart" color="success"
                   @click="addGastronomicMenuToCart">
              <v-icon left>mdi-cart</v-icon>
              Ajouter au panier
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Avis des clients</v-expansion-panel-header>
          <v-expansion-panel-content>
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
      cart: "",
      menuPrice: 0,
      gastronomicMenuPrice: 0,
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
    setMenuPrice(payload) {
      this.menuPrice = payload.price;
    },
    addMenuToCart() {
      this.cart += this.name + "-m-" + this.menuPrice + "|";
      console.log(this.cart);
    },
    setGastronomicMenuPrice(payload) {
      this.menuPrice = payload.price;
    },
    addGastronomicMenuToCart() {
      this.cart += this.name + "-gm-" + this.menuPrice + "|";
      console.log(this.cart);
    },
  },
};
</script>

<style scoped>


#map{
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-top: 5%;
  
}

#video{
  width: 50%;
  margin-left: 50%;
}

#photo{
  width: 10vw;
  height: 0.005vw;

}

#left-side{
  float: left;
  width: 50%;
  text-align: center;
  margin-top: 4%;
  padding-left: 2%; 
  
}

#right-side{
  float: right;
  width: 50%;
  text-align: center;
  margin-top: 4%; 
  padding-right: 2%;
  padding-left: 2%;

}

h1{
  margin-top: 4%;
  font-size: 3vw;
  margin-bottom: 2%;
}

#info{
  margin-top: 40%;
  text-align: center;
  margin-bottom: 5%;
}

#avis{
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 10%;
}

p{
  font-size: 0.85vw;
}

.addToCart {
  float: right;
  color: green;
}

#pannel{
  border-style: solid;
  border-width: 0.5vw;
  border-color: #32424F;
}

#header1{
  border-bottom-style: solid;
  border-width: 0.5vw;
  border-color: #8B4139;
}

#header2{
  border-style: solid;
  border-width: 0.5vw;
  border-radius: 3px;
  padding: 3%;
  margin-left: 25%;
  margin-right: 25%;
  border-color: #32424F;
  font-style: oblique;
}



</style>