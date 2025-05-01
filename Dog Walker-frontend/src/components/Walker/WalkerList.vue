<script>
import WalkerCard from "../Walker/WalkerCard.vue";

export default {
    components: {
        WalkerCard,
    },
    data() {
        return {
            // sample data for the cards (later data will be fetched from the API)
            walkers: [
                {
                    image: "",
                    name: 'John Doe',
                    experience: "5 years",
                    rating: 4.8,
                    price: 20,
                },
                {
                    image: "",
                    name: 'Jane Smith',
                    experience: "3 years",
                    rating: 4.5,
                    price: 25,
                },
                {
                    image: "",
                    name: 'Mike Johnson',
                    experience: "2 years",
                    rating: 4.7,
                    price: 15,
                },
                {
                    image: "",
                    name: 'Emily Davis',
                    experience: "4 years",
                    rating: 4.9,
                    price: 30,
                },
                {
                    image: "",
                    name: 'Sarah Wilson',
                    experience: "1 year",
                    rating: 4.6,
                    price: 18,
                }
            ],
        };
    },
}
</script>
<template>
    <div class="card-container">
        <WalkerCard
            v-for="(walker, index) in walkers"
            :key="index"
            :image="walker.image"
            :name="walker.name"
            :experience="walker.experience"
            :rating="walker.rating"
            :price="walker.price"
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