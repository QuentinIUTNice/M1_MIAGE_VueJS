<template>
  <div class="picture"></div>
</template>

<script>
export default {
  mounted() {
    this.getPicture();
  },
  methods: {
    getPicture() {
      let query = "Restaurant";

      fetch("https://api.pexels.com/v1/search?query=" + query, {
        headers: {
          Authorization:
            "563492ad6f9170000100000124da6ddeb4a349b3b40c98984ddc5eaa",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          // Nombre de photos récupérées par le fetch
          //
          let nbPictures = data.photos.length;

          // Génération d'un nombre entre 0 et le nombre de photos récupérées
          //
          let random = Math.floor(Math.random() * (nbPictures - 0 + 1)) + 0;

          // Récupération de l'objet photo
          //
          let picture = data.photos[random];

          // Récupétation de la div dans laquelle il faut afficher la photo
          //
          let div = document.getElementsByClassName("picture")[0];

          // Ajout de la photo au HTML
          //
          div.innerHTML += "<img src=" + picture.src.tiny + "/>";
        });
    },
  },
};
</script>


<style>

.picture{
  width: 15vw;
}
</style>