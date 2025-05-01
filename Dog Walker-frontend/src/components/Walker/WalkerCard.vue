<script>
export default {
    props: {
        image: String,
        name: String,
        email: String,
        experience: String,
        price: Number,
    },
}
</script>
<template>
    <div class="card" style="width: 20rem">
    <img class="card-img-top" :src="image" alt="Dog image " />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">E-mail: {{ email }}</p>
      <p class="card-text">Experience: {{ experience }}</p>
      <p class="card-text">Price: {{ price }}</p>
      <button class="btn btn-primary">Send Request</button>
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