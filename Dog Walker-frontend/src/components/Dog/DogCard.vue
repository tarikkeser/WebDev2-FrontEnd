<script>
export default {
  // props are used for passing data from parent to child components.
  props: {
    image: String,
    name: String,
    breed: String,
    age: Number,
    size: String,
  },
};
</script>

<template>
  <div class="card" style="width: 20rem">
    <img class="card-img-top" :src="image" alt="Dog image " />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">Breed:{{ breed }}</p>
      <p class="card-text">Age:{{ age }}</p>
      <p class="card-text">Size:{{ size }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  margin: 1rem;
}
.card-img-top {
  height: 20rem;
  object-fit: cover;
}
.card:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}
.card-title {
  font-size: 1.5rem;
}
.card-text {
  font-size: 1rem;
}
</style>
