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
      price: 0,
    };
  },
  mounted() {
    this.main();
  },
  watch: {
    price: {
      handler (newVal) {
        if(newVal > 0) {
          this.$emit('rGastronomicMenuPrice', { price: this.price });
        }
      }
    }
  },
  methods: {
    async main() {
      await this.assignData();
      await this.generateRandoms();
      await this.generateMenu();
      await this.displayMenu();
    },
    assignData() {
      return new Promise(resolve => {
        this.meals = mealsData;

        resolve('data resolved');
      });
    },
    generateRandoms() {
      return new Promise(resolve => {
        for(let i = 0; i < 3; i++) {
          this.tabRandom.push(Math.floor(Math.random() * (5)));
        }

        resolve('randoms resolved');
      });
    },
    generateMenu() {
      return new Promise(resolve => {
        let gStarter = this.meals.gStarters[this.tabRandom[0]];
        let gDish = this.meals.gDishes[this.tabRandom[1]];
        let gDessert = this.meals.gDesserts[this.tabRandom[2]];

        this.menu += '<br />';
        this.menu += '<div><table>';
        this.menu += '<tr><th></th><th>Nom</th><th>Image</th><th>Prix</th></tr>';
        this.menu += '<tr><th>Entrée</th><td>' + gStarter.name + '</td><td><img src=' + gStarter.picture + ' height="100"/></td><td>' + gStarter.price + '</td></tr>';
        this.menu += '<tr><th>Plat</th><td>' + gDish.name + '</td><td><img src=' + gDish.picture + ' /></td><td>' + gDish.price + '</td></tr>';
        this.menu += '<tr><th>Dessert</th><td>' + gDessert.name + '</td><td><img src=' + gDessert.picture + ' /></td><td>' + gDessert.price + '</td></tr>';
        this.menu += '</table></div>';

        this.price = parseInt(gStarter.price.substring(0, gStarter.price.length)) + 
                     parseInt(gDish.price.substring(0, gDish.price.length)) + 
                     parseInt(gDessert.price.substring(0, gDessert.price.length));

        console.log(this.price);

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