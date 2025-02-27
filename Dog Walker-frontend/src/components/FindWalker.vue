<script>
// example ? 
export default {
  data() {
    return {
      walkers: [],
    };
  },
  created() {
    fetch("http://localhost:3000/walkers")
      .then((response) => response.json())
      .then((data) => {
        this.walkers = data;
      });
  },
};
</script>
<template>

</template>

<style scoped>

</style>