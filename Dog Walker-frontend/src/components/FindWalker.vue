<script>
import WalkerList from "../components/Walker/WalkerList.vue";
export default {
  components: {
    WalkerList,
  },
};
</script>
<template>
  <div class="container mt-5">
    <h2 class="mb-4">Find a Walker</h2>
    <WalkerList />
  </div>
</template>

<style>
.container {
  text-align: center;
}
</style>
