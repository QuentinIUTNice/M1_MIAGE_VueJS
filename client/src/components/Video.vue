<template>
  <div class="video"></div>
</template>

<script>
export default {
  mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      let query = "Restaurant";

      fetch("https://api.pexels.com/videos/search?query=" + query, {
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
          let nbVideos = data.videos.length;
          
          // Génération d'un nombre entre 0 et le nombre de photos récupérées
          //
          let random = Math.floor(Math.random() * (nbVideos - 0 + 1)) + 0;

          // Récupération de l'objet photo
          //
          let video = data.videos[random];
          
          // Récupétation de la div dans laquelle il faut afficher la photo
          //
          let div = document.getElementsByClassName("video")[0];

          // Ajout de la photo au HTML
          //
          div.innerHTML += '<video width="320" height="240" controls><source src=' + video.video_files[0].link + '></video>';
        });
    },
  },
};
</script>
