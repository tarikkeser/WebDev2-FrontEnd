  <script>
  import InfoCard from "../Homepage/InfoCard.vue";
  import picture1 from "@/assets/images/cardleft.webp";
  import picture2 from "@/assets/images/cardmiddle.webp";
  import picture3 from "@/assets/images/cardright.png";
  
  export default {
    components: {
      InfoCard,
    },
    data() {
      return {
        cards: [
          {
            title: "Easy to Use",
            text: "Find trusted walkers for your pets easily.",
            image: picture1,
          },
          {
            title: "Earn with Love",
            text: "Walk dogs and earn while having fun!",
            image: picture2,
          },
          {
            title: "Join the Community",
            text: "Be part of a growing pet-loving network.",
            image: picture3,
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
  