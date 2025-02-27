<script>
import StockItem from "./StockItem.vue";
import data from "../data";

export default {
  data() {
    const stockName = this.$route.params.name;
    const stock = data.stocks.find(
      (stock) => stock.name.toLowerCase() === stockName
    );

    return {
      stock,
    };
  },
};
</script>

<template>
  <h1>{{ stock.name }} Details</h1>
  <h2>Price: {{ stock.currency }}{{ stock.price.toFixed(2) }}</h2>
</template>

<style lang="css" scoped></style>
