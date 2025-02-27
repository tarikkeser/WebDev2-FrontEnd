<script>
import about1 from "../assets/images/about1.jpeg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.jpeg";
import about4 from "../assets/images/about4.jpg";

export default {
  data() {
    return {
      images: [about1, about2, about3, about4], // Dizi olarak saklıyoruz
    };
  },
};
</script>

<template>
  <section class="py-5">
    <div class="container">
      <div class="row gx-5 align-items-center">
        <!-- About Us Text -->
        <div class="col-md-5">
          <div class="mt-5 mt-md-0">
            <h2 class="display-5 fw-bold">About Us</h2>
            <p class="lead">
              At Walk Paw, we believe that every walk should be more than just a
              routine—it should be an adventure! Whether you're a busy pet
              parent in need of a trusted walker or a passionate dog lover
              looking to spend time with adorable pups while earning, Walk Paw
              connects you with the perfect match.
            </p>
            <p class="lead">
              Our mission is simple: to create a community where tails wag with
              joy, paws explore new paths, and every step strengthens the bond
              between humans and dogs.
            </p>
          </div>
        </div>

        <!-- About Us Images -->
        <div class="col-md-7">
          <div class="row g-3">
            <div v-for="(image, index) in images" :key="index" class="col-6 ">
              <img :src="image" class="img-fluid rounded-3" alt="About Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
