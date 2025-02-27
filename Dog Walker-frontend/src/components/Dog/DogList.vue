<script>
import DogCard from "../Dog/DogCard.vue";

export default {
  components: {
    DogCard,
  },
  data() {
    return {
      //!!!!!! need to make some database connections I believe.
      cards: [
        {
         // image:,
        //  name:,
        //  breed:,
        //  age:,
        //  size:,
        },
      ],
    };
  },
};
</script>
<template>
  <div class="card-container">
    <InfoCard
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :text="card.text"
      :image="card.image"
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
