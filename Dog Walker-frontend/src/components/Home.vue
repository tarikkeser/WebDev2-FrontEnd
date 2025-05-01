<script>
import CardList from "../components/Homepage/CardList.vue";
export default {
  components: {
    CardList,
  },
};
</script>

<template>
  <div class="hero">
    <div class="text-container mt-3">
      <h1 class="fw-bold display-4">
        Welcome to <br> Walk Paw! 🐾
      </h1>
      <p class="lead mt-3">
        Whether you're looking for a trusted walker for your furry friend or hoping to spend time with lovable dogs while earning, Walk Paw is here for you. Join a community where tails wag with joy, paws find new paths, and every walk turns into an adventure!
      </p>
      <button class="btn btn-primary btn-lg mt-3">Get Started</button>
    </div>
  </div>
  <div class="container">
    <h2 class="display-4 text-center mt-5">Why Walk Paw?</h2>
    <CardList />
  </div>
</template>

<style scoped>

.hero {
  background-image: url("@/assets/images/test2.webp"); 
  background-size: contain;      
  background-position: center;     
  background-repeat: no-repeat;
  width: 100%;                     
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 50px;
  flex-direction: column;
  box-sizing: border-box;      
  overflow: hidden;                
}

.text-container {
  padding: 10px;
  max-width: 550px;
}

.container {
  margin-top: 50px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
