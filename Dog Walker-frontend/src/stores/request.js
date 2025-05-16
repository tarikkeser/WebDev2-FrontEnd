import {defineStore} from "pinia";
import axios from "axios";
import {API_ENDPOINTS} from "@/config";

export const useRequestStore = defineStore("request", {
    state: () => ({
        requests: [],
        loading: false,
        error: null,
    }),
    getters: {
        getRequests: (state) => state.requests
    },
    actions: {
       //** * OWNER  ** *//
       // get requests by owner 
       async fetchRequestsByOwner() {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.get(`${API_ENDPOINTS.request}/owner`);
                this.requests = response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to fetch requests";
            } finally {
                this.loading = false;
            }
        },
        // send request to walker by owner
        async sendRequestToWalker(requestData) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.post(`${API_ENDPOINTS.request}`, requestData);
                this.requests.push(response.data);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to send request";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        // cancel request by owner
        async cancelRequestByOwner(requestId) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.delete(`${API_ENDPOINTS.request}/${requestId}`);
                this.requests = this.requests.filter(request => request.id !== requestId);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to cancel request";
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // ** * WALKER  ** *//
        // get requests by walker
        async fetchRequestsByWalker() {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.get(`${API_ENDPOINTS.request}/walker`);
                this.requests = response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to fetch requests";
            } finally {
                this.loading = false;
            }
        },
        // accept request by walker
        async acceptRequestByWalker(requestId) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.post(`${API_ENDPOINTS.request}/accept/${requestId}`);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to accept request";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        // reject request by walker
        async rejectRequestByWalker(requestId) {
            try {
                this.loading = true;
                this.error = null;
                const response = await axios.post(`${API_ENDPOINTS.request}/reject/${requestId}`);
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || "Failed to reject request";
                throw error;
            } finally {
                this.loading = false;
            }
        },
    }
});