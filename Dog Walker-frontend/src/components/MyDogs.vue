<script>
import DogList from "../components/Dog/DogList.vue";
export default {
  components: {
    DogList,
  },
};
</script>
<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Dogs</h2>
    <DogList />
  </div>
</template>

<style>
.container {
text-align: center;
}
</style>