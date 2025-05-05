import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config"; 

// Add axios interceptor
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  });

export const useDogStore = defineStore("dog", {
    state: () => ({
        dogs: [],
        loading: false,
        error: null,
    }),
    
    getters: {
        allDogs: (state) => state.dogs,
        getDogById: (state) => (id) => state.dogs.find(dog => dog.id === id),
    },
    
    actions: {
        // get dogs by owner id
        async fetchDogsByOwner(ownerId) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.get(`${API_ENDPOINTS.dog}/owner/${ownerId}`);
                this.dogs = response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to fetch dogs";
            } finally {
                this.loading = false;
            }
        },

        // get dog by id 
        async fetchDogById(dogId) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.get(`${API_ENDPOINTS.dog}/${dogId}`);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to fetch dog";
            } finally {
                this.loading = false;
            }
        },
        // create new dog
        async createDog(dogData) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.post(`${API_ENDPOINTS.dog}`, dogData);
                this.dogs.push(response.data);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to create dog";
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // update dog
        async updateDog(dogId, dogData) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.put(`${API_ENDPOINTS.dog}/${dogId}`, dogData);
                const index = this.dogs.findIndex(dog => dog.id === dogId);
                if (index !== -1) {
                    this.dogs[index] = response.data;
                }
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to update dog";
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // delete dog
        async deleteDog(dogId) {
            try {
                this.loading = true;
                this.error = null;
                await axios.delete(`${API_ENDPOINTS.dog}/${dogId}`);
                this.dogs = this.dogs.filter(dog => dog.id !== dogId);
                return true;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to delete dog";
                throw error;
            } finally {
                this.loading = false;
            }
        }
    },
    });