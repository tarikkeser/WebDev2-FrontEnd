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
    <div class="content-wrapper">
      <div class="text-container mt-3">
        <h1 class="fw-bold display-4">
          Welcome to <br />Walk Paw! 🐾
        </h1>
        <p class="lead mt-3">
          Whether you're looking for a trusted walker for your furry friend or hoping to spend time with lovable dogs while earning, Walk Paw is here for you. Join a community where tails wag with joy, paws find new paths, and every walk turns into an adventure!
        </p>
      </div>
      <div class="image-container">
        <img src="@/assets/images/test2.webp" alt="Hero image" />
      </div>
    </div>
  </div>

  <div class="container">
    <h2 class="display-4 text-center mt-5">Why Walk Paw</h2>
    <CardList />
  </div>
  <div class="testimonials-section">
  <h2 class="text-center mb-5">What Our Users Say</h2>
  <div class="testimonial-cards">
    <div class="testimonial-card">
      <p>"Walk Paw changed my life! I earn while walking!"</p>
      <span>— Sarah, Amsterdam</span>
    </div>
    <div class="testimonial-card">
      <p>"I've met so many amazing pets. Highly recommend to all dog lovers."</p>
      <span>— James, Rotterdam</span>
    </div>
    <div class="testimonial-card">
      <p>"Super easy to use and trustworthy walkers. I feel safe every time."</p>
      <span>— Aylin, Utrecht</span>
    </div>
  </div>
</div>
<div class="instagram-section mt-5">
  <p>Follow us on Instagram for pup-dates! 🐶</p>
  <a href="https://instagram.com" target="_blank" class="instagram-button">
    <img src="@/assets/images/insta.jpeg" alt="Instagram" />
    @walkpaw
  </a>
</div>

</template>

<style scoped>
.hero {
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

.text-container {
  flex:2;
  min-width: 300px;
  max-width: 550px;
}

.text-container h1 {
  font-size: 4rem;
}

.text-container p {
  font-size: 1.50rem;
  line-height: 1.8;
}

.image-container {
  flex: 3;
  min-width: 300px;
  text-align: center;
}

.image-container img {
width: 100%;
  max-width: 700px; 
  height: auto;
  object-fit: contain;
}
.testimonials-section {
  padding: 60px 20px;
  text-align: center;
}

.testimonial-cards {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 20px 20px rgba(0,0,0,0.1);
  max-width: 300px;
  text-align: center;
}

.testimonial-card p {
  font-style: italic;
  margin: 15px 0;
}

.testimonial-card span {
  font-weight: bold;
  color: #555;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff9800;
  margin-bottom: 10px;
}
.instagram-section {
  margin-top: 40px;
  text-align: center;
}

.instagram-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #e1306c;
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.instagram-button:hover {
  background-color: #c91e5e;
}

.instagram-button img {
  width: 20px;
  height: 20px;
}
.display-4 {
  font-size: 3rem;
}


@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .text-container,
  .image-container {
    max-width: 100%;
  }
}
</style>

