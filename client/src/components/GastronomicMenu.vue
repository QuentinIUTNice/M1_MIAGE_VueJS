<template>
  <div id="gm"></div>
</template>

<script>
import mealsData from '../../public/meals.json'

export default {
  name: "Menu",
  data: function () {
    return {
      gStarters: {},
      gDishes: {},
      gDesserts: {},
      tabRandom: [],
      menu: "",
    };
  },
  mounted() {
    this.main();
  },
  methods: {
    async main() {
      let result;

      result = await this.assignData();
      console.log(result);

      result = await this.generateRandoms();
      console.log(result);
      
      result = await this.generateMenu();
      console.log(result);

      result = await this.displayMenu();
      console.log(result);
    },
    assignData() {
      return new Promise(resolve => {
        this.meals = mealsData;

        console.log(this.meals);

        resolve('data resolved');
      });
    },
    generateRandoms() {
      return new Promise(resolve => {
        for(let i = 0; i < 3; i++) {
          this.tabRandom.push(Math.floor(Math.random() * (5)));
        }

        for(let i = 0; i < this.tabRandom.length; i++) {
          console.log(this.tabRandom[i]);
        }

        resolve('randoms resolved');
      });
    },
    generateMenu() {
      return new Promise(resolve => {
        let gStarter = this.meals.gStarters[this.tabRandom[0]];
        let gDish = this.meals.gDishes[this.tabRandom[1]];
        let gDessert = this.meals.gDesserts[this.tabRandom[2]];

        console.log(gStarter);
        console.log(gDish);
        console.log(gDessert);

        this.menu = '<h1>Gastronomic menu</h1>';
        this.menu += '<br />';
        this.menu += '<div><table>';
        this.menu += '<tr><th></th><th>Nom</th><th>Description</th><th>Image</th><th>Prix</th></tr>';
        this.menu += '<tr><th>Entrée</th><td>' + gStarter.name + '</td><td>' + gStarter.description + '</td><td><img src=' + gStarter.picture + ' height="100"/></td><td>' + gStarter.price + '</td></tr>';
        this.menu += '<tr><th>Plat</th><td>' + gDish.name + '</td><td>' + gDish.description + '</td><td><img src=' + gDish.picture + ' /></td><td>' + gDish.price + '</td></tr>';
        this.menu += '<tr><th>Plat</th><td>' + gDessert.name + '</td><td>' + gDessert.description + '</td><td><img src=' + gDessert.picture + ' /></td><td>' + gDessert.price + '</td></tr>';
        this.menu += '</table></div>';

        console.log(this.menu);

        resolve('menu resolved');
      });
    },
    displayMenu() {
      return new Promise(resolve => {
          document.getElementById('gm').innerHTML = this.menu;

          resolve('display resolved');
      });
    }
  },
};
</script>