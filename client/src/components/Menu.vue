<template>
  <div id="0">
    <h1>Menu</h1>
  </div>
</template>

<script>
import json from '../../public/meals.json'

export default {
  data: function () {
    return {
      meals: json,
      starter: {},
      dish: {},
      dessert: {},
    };
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      let tabRandom = [];
      
      // Génération d'un nombre entre 0 et le nombre de photos récupérées
      //
      for(let i = 0; i < 3; i++) {
        tabRandom.push(Math.floor(Math.random() * (6)));
      }

      this.starter = this.meals.starter[tabRandom[0]];
      this.dish = this.meals.dish[tabRandom[1]];
      this.dessert = this.meals.dessert[tabRandom[2]];
      
      this.displayMenu();
    },
    displayMenu() {
      let div = document.getElementById("0");
      let menu;
      menu += '<h1>Menu</h1>';
      menu += '<br />';
      menu += '<table><thead>';
      menu += '<tr><th></th><th>Nom</th><th>Description</th><th>Image</th><th>Prix</th></tr>';
      menu += '<tr><th>Entrée</th><td>' + this.starter.name + '</td><td>' + this.starter.description + '</td><td><img src=' + this.starter.picture + ' height="100"/></td><td>' + this.starter.price + '</td></tr>';
      menu += '<tr><th>Plat</th><td>' + this.dish.name + '</td><td>' + this.dish.description + '</td><td><img src=' + this.dish.picture + ' /></td><td>' + this.dish.price + '</td></tr>';
      menu += '<tr><th>Plat</th><td>' + this.dessert.name + '</td><td>' + this.dessert.description + '</td><td><img src=' + this.dessert.picture + ' /></td><td>' + this.dessert.price + '</td></tr>';
      menu += '</thead></table>'
      div.innerHTML = menu;
    }
  },
};
</script>