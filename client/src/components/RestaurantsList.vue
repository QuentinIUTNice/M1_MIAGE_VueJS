<template>
  <div class="page">
    <div class="left-side">
      <h2>Ajouter un restaurant:</h2>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="ajouterRestaurant($event)">
        <v-text-field
          id="nom"
          name="nom"
          type="text"
          v-model="nom"
          :rules="nameRules"
          label="Nom du restaurant"
          required></v-text-field>

        <v-text-field
          id="cuisine"
          name="cuisine"
          type="text"
          v-model="cuisine"
          :rules="cuisineRules"
          label="Type de cuisine"
          required></v-text-field>

        <v-btn id="formValidate"
          class="mr-4"
          type="submit">
          Ajouter
        </v-btn>

        <v-btn id="formReset"
          class="mr-4"
          @click="resetForm">
          Vider le formulaire
        </v-btn>
      </v-form>
    </div>

    <div class="right-side" data-app>
      <v-card id="table">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          loading
          loading-text="Chargement en cours..."
          :headers="headers"
          :items="restaurants"
          :items-per-page="10"
          :search="search">
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.cuisine }}</td>
              <td><md-button class="md-raised md-primary" :to="'/restaurants/' + row.item._id">Détail</md-button></td>
              <td><md-button class="md-raised md-accent" @click="supprimerRestaurant(row.item)">Supprimer</md-button></td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantsList",
  data: function () {
    return {
      nom: "",
      nameRules: [
        v => !!v || 'Name is required',
      ],
      cuisine: "",
      cuisineRules: [
        v => !!v || 'E-mail is required',
      ],

      search: "",
      headers: [
        { text: 'Nom', align: 'start', value: 'name', },
        { text: 'Cuisine', align: 'start', value: 'cuisine', },
        { text: 'Détails', align: 'start', value: 'cuisine' },
        { text: 'Supprimer', align: 'start', },
      ],
      restaurants: [],
      /*nom: "",
      cuisine: "",*/
      msg: "",
    };
  },
  mounted() {
    this.getRestaurantsFromServer();
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    resetForm () {
      this.$refs.form.reset()
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";

      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            this.restaurants = res.data;
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
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

      this.resetForm();
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-side{
  float: left;
  position: fixed;
  text-align: center;
  width: 46%;
  margin-top: 5%;
  margin-left: 2%;
}

h2 {
  font-size: 1.5vw;
  text-align: center;
  margin-bottom: 2%;
  color: #32424F;
}

#formValidate {
  margin-right: 1%;
   height: 3vw;
  background-color: #8B4139;
  color: white;
}

#formReset {
 height: 3vw;
  background-color: #32424F;
  color: white;
  margin-left: 1%;
}

.right-side{
  float: right;
  width: 46%;
  margin-top: 5%;
  margin-right: 2%;
}

#table {
  float: right;
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>