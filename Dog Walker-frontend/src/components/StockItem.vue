<script>
export default {
  data() {
    return { quantity: 1 };
  },
  props: {
    name: String,
    price: Number,
    previousPrice: Number,
    currency: String,
  },
  computed: {
    priceHasIncreased() {
      return this.price >= this.previousPrice;
    },
  },
};
</script>

<template>
  <!-- applying bootstrap table styles -->
  <tr
    :class="{
      'table-primary': priceHasIncreased,
      'table-danger': !priceHasIncreased,
    }"
  >
    <td>
      <RouterLink :to="`/stock/${name.toLowerCase()}`">
        {{ name }}
      </RouterLink>
    </td>
    <td>{{ currency }}{{ price.toFixed(2) }}</td>
    <td>{{ currency }}{{ previousPrice.toFixed(2) }}</td>
    <td>
      <!-- model binding -->
      <input v-model="quantity" type="number" min="1" />
      <button
        type="button"
        class="btn btn-secondary mx-2"
        @click="$emit('buyStock', name, quantity)"
      >
        Buy
      </button>
    </td>
  </tr>
</template>

<style lang="css" scoped></style>
