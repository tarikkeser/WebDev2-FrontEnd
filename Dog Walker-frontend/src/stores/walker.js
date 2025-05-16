import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config"; 

  export const useWalkerStore = defineStore("walker", {
    state: () => ({
        walkers: [],
        loading: false,
        error: null,
    }),
    getters: {
    getWalkers: (state) => state.walkers
    },
actions: {
    async fetchWalkers() {
        try {
            this.loading = true;
            this.error = null;
            const response = await axios.get(`${API_ENDPOINTS.walker}`);
            this.walkers = response.data;
        } catch (error) {
            this.error = error.response?.data?.message || "Failed to fetch walkers";
        } finally {
            this.loading = false;
        }
    }
}
  });
