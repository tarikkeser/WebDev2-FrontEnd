<script>
import WalkerCard from "../Walker/WalkerCard.vue";
import { useWalkerStore } from "@/stores/walker";
import { useAuthStore } from "@/stores/auth";


export default {
    name: "WalkerList", 
    components: {
        WalkerCard,
    },
    data() {
        return {
            walkerStore: useWalkerStore(),
            authStore: useAuthStore(),
        };
    },
    computed: {
        walkers() {
            return this.walkerStore.getWalkers;
        },
    },
    mounted() {
        if (this.authStore.user) {
            this.loadWalkers();
        }
        this.$watch(
            () => this.authStore.user,
            (user) => {
                if (user && user.id) {
                    this.loadWalkers();
                }
            }
        );
    },
    methods: {
        async loadWalkers() {
            try {
                if (!this.authStore.user?.id) {
                    console.log("No user found");
                    return;
                }
                await this.walkerStore.fetchWalkers();
            } catch (error) {
                console.error("Error loading walkers:", error);
                this.error = "Failed to fetch walkers";
            }
        },
    },
}
</script>
<template>
    <div class="card-container">
        <WalkerCard
            v-for="(walker, index) in walkers"
            :key="index"
            :id="walker.id"
            :image="walker.profile_picture || 'https://placehold.co/150x150?text=No+Image'"
            :name="walker.name"
            :experience="walker.experience"
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