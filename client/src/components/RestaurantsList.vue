<template>
  <div class="hello">
    <h1>Liste des restaurants</h1>

    <br />

    <h2>Nombre de restaurants : {{ nbTotalRestaurants }}</h2>
    <h3>Nombre de pages : {{ nbTotalPages }}</h3>
    <p>
      Nombre de restaurants par pages :
      <input
        v-on:input="getRestaurantsFromServer()"
        type="range"
        min="1"
        :max="nbTotalRestaurants"
        v-model="pageSize"
      />
      {{ pageSize }}
    </p>
    <br />

    <h4>Ajouter un restaurant</h4>
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>

    <h4>Reschercher un restaurant</h4>
    <p>
      <input
        v-on:input="searchRestaurants()"
        type="text"
        v-model="searchedRestaurant"
      />
    </p>

    <h4>Naviguer entre les pages</h4>
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

    <br /><br />

    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
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
          ><router-link :to="'/restaurants/' + item._id"
            >Détail</router-link
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
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
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  background-color: yellow;
}

input:invalid {
  background-color: pink;
}

input:valid {
  background-color: lightGreen;
}

h1 {
  text-align: center;
}
</style>