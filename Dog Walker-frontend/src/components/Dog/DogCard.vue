<script>
export default {
  props: {
    photo: String,
    name: String,
    breed: String,
    age: Number,
    size: String,
  },
  data() {
    return {
      imageError: false,
      defaultImage: 'https://placehold.co/400x300?text=No+Image'
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true;
    }
  }
};
</script>

<template>
  <div class="card" style="width: 20rem">
    <img 
      class="card-img-top" 
      :src="imageError ? defaultImage : (photo || defaultImage)" 
      @error="handleImageError"
      :alt="name" 
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">Breed: {{ breed }}</p>
      <p class="card-text">Age: {{ age }}</p>
      <p class="card-text">Size: {{ size }}</p>
      <slot name="actions"></slot> 
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
.btn{
  background-color: rgb(255, 77, 18);
}
</style>
