<script>
import DogCard from "../Dog/DogCard.vue";

export default {
  components: {
    DogCard,
  },
  data() {
    return {
     // sample data for the cards (later data will be fetched from the API)
      dogs: [
        {
         image: "",
         name: 'Max',
         breed: "Golden Retriever",
         age: 3,
         size: "Medium",
        },
        {
          image: "",
          name: 'Buddy',
          breed: "Labrador",
          age: 2,
          size: "Large",
          },
          {
          image: "",
          name: 'Charlie',
          breed: "Beagle",
          age: 4,
          size: "Small",
          },
          {
          image: "",
          name: 'Rocky',
          breed: "Bulldog",
          age: 5,
          size: "Medium",
          },
          {
          image: "",
          name: 'Daisy',
          breed: "Poodle",
          age: 1,
          size: "Small",
        }
      ],
    };
  },
};
</script>
<template>
  <div class="card-container">
    <DogCard
      v-for="(dog, index) in dogs"
      :key="index"
      :image="dog.image"
      :name="dog.name"
      :breed="dog.breed"
      :age="dog.age"
      :size="dog.size"
    />
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  padding: auto;
}
</style>
