<script>
import StockItem from "./StockItem.vue";
import data from "../data";

export default {
  data() {
    return {
      interval: null,
      stocks: data.stocks,
    };
  },
  components: {
    StockItem,
  },
  mounted() {
    // save the interval so we can clean it up on unmount
    this.interval = setInterval(() => {
      this.randomizePrices();
    }, 1000);
  },
  beforeUnmount() {
    // clean up the interval we created
    clearInterval(this.interval);
  },
  methods: {
    randomizePrices() {
      this.stocks = this.stocks.map((stock) => {
        let newPrice = stock.price + Math.random() * 2 - 1;
        if (newPrice < 0) {
          newPrice = 0;
        }
        return {
          ...stock,
          previousPrice: stock.price,
          price: newPrice,
        };
      });
    },
    buyStock(name, quantity) {
      alert(`Purchased ${quantity} ${name} stocks`);
    },
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Stock Name</th>
        <th>Price</th>
        <th>Previous Price</th>
        <th>Buy</th>
      </tr>
    </thead>
    <tbody>
      <StockItem
        v-for="stock in stocks"
        :key="stock.name"
        :name="stock.name"
        :price="stock.price"
        :previousPrice="stock.previousPrice"
        :currency="stock.currency"
        @buyStock="buyStock"
      ></StockItem>
      <!-- alternatively, we could just spread the stock properties -->
      <!-- we can do this because StockItem props match the stock object properties -->
      <!-- <StockItem {...stock} /> -->
    </tbody>
  </table>
  <button @click="randomizePrices" class="btn btn-primary">
    Randomize Prices
  </button>
</template>

<style lang="css" scoped></style>
