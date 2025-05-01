import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config"; 

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user, // returns the entire user object for use in components
    isOwner: (state) => state.user?.role==='owner',
    isWalker: (state) => state.user?.role==='walker',
  },
  actions: {
    async fetchUser() {
        try {
          this.loading = true;
          this.error = null;
          const response = await axios.get(`${API_ENDPOINTS.auth}/me`);
          
          // Update to match your backend response structure
          this.user = {
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            role: response.data.role
          };
          return response;
        } catch (error) {
          this.error = error.response?.data?.message || "Failed to fetch user data";
          // If unauthorized, logout
          if (error.response?.status === 401) {
            this.logout();
          }
        } finally {
          this.loading = false;
        }
      },

    async register(credentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.post(
          `${API_ENDPOINTS.auth}/register`,
          credentials
        );
        this.user = response.data.user;
        this.token = response.data.token;

        // Store token in localStorage
        localStorage.setItem("token", this.token);
        // Set default Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Registration failed";
      } finally {
        this.loading = false;
      }
    },

    async login(credentials) {
        try {
          this.loading = true;
          this.error = null;
          const response = await axios.post(
            `${API_ENDPOINTS.auth}/login`,
            credentials
          );
          
          // Store token
          this.token = response.data.token;
          localStorage.setItem("token", this.token);
          
          // Set axios default header
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
          
          // Fetch user data  after login
          await this.fetchUser();
          
          return response;
        } catch (error) {
          this.error = error.response?.data?.message || "Login failed";
        } finally {
          this.loading = false;
        }
      },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },

    // Initialize auth state from localStorage
    async initializeAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          await this.fetchUser();
        } catch (error) {
          // If fetching user fails, token might be invalid
          this.logout();
        }
      }
    },
  },
});
