import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

/**
 * Pinia store for user profile management.
 * Handles fetching and updating the user's profile.
 */
export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),
  getters: {
    getProfile: (state) => state.profile,
  },
  actions: {
    /**
     * Fetch the user's profile from the backend by user ID.
     * @param {number|string} userId - The user's ID.
     */
    async fetchProfile(userId) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(`${API_ENDPOINTS.profile}/${userId}`);
        this.profile = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch profile";
      } finally {
        this.loading = false;
      }
    },
    /**
     * Update the user's profile with the given data.
     * @param {number|string} userId - The user's ID.
     * @param {Object} updateData - The fields to update.
     */
    async updateProfile(userId, updateData) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.put(
          `${API_ENDPOINTS.profile}/${userId}`,
          updateData
        );
        this.profile = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to update profile";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});