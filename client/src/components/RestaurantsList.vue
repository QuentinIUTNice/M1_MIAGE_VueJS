<template>
  <div class="page">
    <div class="left-side">

    <br />

    <h2>Nombre de restaurants : {{ nbTotalRestaurants }}</h2>
    <h2>Nombre de pages : {{ nbTotalPages }}</h2>
    <h2>
      Nombre de restaurants par pages :
      <input
        v-on:input="getRestaurantsFromServer()"
        type="range"
        min="1"
        :max="100"
        v-model="pageSize"
      />
      {{ pageSize }}
    </h2>
    <br />
    <br />

    <h2>Ajouter un restaurant:</h2>
    <form @submit.prevent="ajouterRestaurant($event)">
      <div id="ajouterForm" class="form-group">
        <input name="nom" class="form-control" placeholder="Nom du Restaurant" id="nom" type="text" required v-model="nom" />
        <input name="cuisine" class="form-control" placeholder="Type de Cuisine" id="cuisine" type="text" required v-model="cuisine" />
      </div>
      <button type="submit" class="btn btn-primary btn-lg" id="ajouter">Ajouter le restaurant</button>
      
    </form>

    
<br/>
<br/>
<br/>
<br/>
    <h2>Rechercher un restaurant:</h2>
    <p>
      <input
        v-on:input="searchRestaurants()"

        type="text"
        class="form-control"
        id="search"
        placeholder="Rechercher..."
        v-model="searchedRestaurant"
      />
    </p>
    <div id="nav">
    <h4>
    <md-button
      class="md-raised"
      v-on:click="previousPage()"
      :disabled="page === 0"
    >
      Page précédente
    </md-button>

    - Page : {{ page }} -

    <md-button
      class="md-raised"
      v-on:click="nextPage()"
      :disabled="page === nbTotalPages - 1"
    >
      Page suivante
    </md-button>
    </h4>
    </div>

    <br /><br />
    </div>

    <div class="right-side">
      <md-table id="tab" v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
      </md-table-row>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item, index }"
        :style="{ backgroundColor: getColor(index) }"
      >
        <md-table-cell md-label="Nom" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell
          ><md-button class="md-raised md-primary" :to="'/restaurants/' + item._id"
            >Détail</md-button
          ></md-table-cell
        >
        <md-table-cell
          ><md-button
            class="md-raised md-accent"
            @click="supprimerRestaurant(item)"
            >Supprimer</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
    </div>
  </div>
  


</template>

<script>
import _ from "lodash";

export default {
  name: "RestaurantsList",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbTotalRestaurants: 0,
      page: 0,
      pageSize: 10,
      nbTotalPages: 0,
      msg: "",
      searchedRestaurant: "",
    };
  },
  mounted() {
    console.log("Récupération des restaurants...");
    this.getRestaurantsFromServer();
    console.log("Restaurants chargés !");
  },
  methods: {
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";

      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.searchedRestaurant;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            this.restaurants = res.data;
            this.nbTotalRestaurants = res.count;
            this.nbTotalPages = Math.round(
              this.nbTotalRestaurants / this.pageSize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    searchRestaurants: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),
    ajouterRestaurant($event) {
      // Récupération du formulaire.
      // Pas besoin de document.querySelector ou
      //               document.getElementById
      // puisque c'est le formulaire qui a généré l'événement
      let form = $event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.msg = res.msg;

            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
    },
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/";

      url += r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.msg = res.msg;

            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    previousPage() {
      if (this.page > 0) {
        this.page--;
        this.getRestaurantsFromServer();
      } else {
        console.log("Première page atteinte");
      }
    },
    nextPage() {
      if (this.page < this.nbTotalPages) {
        this.page++;
        this.getRestaurantsFromServer();
      } else {
        console.log("Dernière page atteinte");
      }
    },
    getColor(index) {
      return index % 2;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  

.left-side{
  float: left;
  position: fixed;
  text-align: center;
  width: 45%;
  margin-top: 5%;
  margin-left: 2.5%;
}

.right-side{
  float: right;
  width: 50%;
  margin-top: 5%;
  background-color: cadetblue;
}


table {
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;
}

tr,
td {
  border: 1px solid black;
}

td {
  padding: 5px;
}

tr:hover {
  background-color: rgb(230, 228, 228);
  border-width: 3px;
  border-color: #22364b;
}

input{
  height: 45px;
  width: 80%;
}

input[id="search"] {
  
  background-image: url('../assets/Vector_search_icon.svg.png');
  background-position: 10px 10px;
  background-size: 22px;
  background-repeat: no-repeat;
  padding-left: 40px;
}

h2 {
  text-align: center;
  margin-bottom: 2%;
}

.form-control{
  margin-bottom: 3px;
}

#ajouterForm{
  float: left;
  width: 70%;
}

#ajouter{
  width: 30%;
  height: 93px;
  background-color: #22364b;
}

#search{
  width: 50%;
  margin-left: 25%;
}

#nav{
  text-align: center;
  position: fixed;
  bottom: 10px;
  width:45%;
}
</style>