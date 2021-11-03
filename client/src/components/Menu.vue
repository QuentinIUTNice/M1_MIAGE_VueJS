<template>
    <div id="m"></div>
</template>

<script>
import mealsData from '../../public/meals.json'

export default {
  name: "Menu",
  data: function () {
    return {
      starters: {},
      dishes: {},
      desserts: {},
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
          this.$emit('rMenuPrice', { price: this.price });
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
        let starter = this.meals.starters[this.tabRandom[0]];
        let dish = this.meals.dishes[this.tabRandom[1]];
        let dessert = this.meals.desserts[this.tabRandom[2]];

        this.menu += '<br />';
        this.menu += '<div><table>';
        this.menu += '<tr><th></th><th>Nom</th><th>Image</th><th>Prix</th></tr>';
        this.menu += '<tr><th>Entrée</th><td>' + starter.name + '</td><td><img src=' + starter.picture + ' height="100"/></td><td>' + starter.price + '</td></tr>';
        this.menu += '<tr><th>Plat</th><td>' + dish.name + '</td><td><img src=' + dish.picture + ' /></td><td>' + dish.price + '</td></tr>';
        this.menu += '<tr><th>Dessert</th><td>' + dessert.name + '</td><td><img src=' + dessert.picture + ' /></td><td>' + dessert.price + '</td></tr>';
        this.menu += '</table></div>';

        this.price = parseInt(starter.price.substring(0, starter.price.length)) + parseInt(dish.price.substring(0, dish.price.length)) + parseInt(dessert.price.substring(0, dessert.price.length));

        console.log(this.price);

        resolve('menu resolved');
      });
    },
    displayMenu() {
      return new Promise(resolve => {
          document.getElementById('m').innerHTML = this.menu;

          resolve('display resolved');
      });
    },
  },
};
</script>