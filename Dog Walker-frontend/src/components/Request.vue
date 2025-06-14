<script>
import { useAuthStore } from "@/stores/auth";
import { useRequestStore } from "@/stores/request";

export default {
  name: "Request",
  setup() {
    const authStore = useAuthStore();
    const requestStore = useRequestStore();
    return { authStore, requestStore };
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    isWalker() {
      return this.authStore.user?.role === "walker";
    },
    requests() {
      return this.requestStore.getRequests;
    }
  },
  async created() {
    this.loading = true;
    try {
      if (this.isWalker) {
        await this.requestStore.fetchRequestsByWalker();
      } else {
        await this.requestStore.fetchRequestsByOwner();
      }
    } catch (error) {
      this.error = "Failed to load requests";
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // walker 
    async handleAccept(requestId) {
      try {
        await this.requestStore.acceptRequestByWalker(requestId);
        // Refresh requests
        await this.requestStore.fetchRequestsByWalker();
      } catch (error) {
        this.error = "To accept this request, you must cancel appointment at the same time slot!";
      }
    },
    // walker
    async handleReject(requestId) {
      try {
        await this.requestStore.rejectRequestByWalker(requestId);
        // Refresh requests
        await this.requestStore.fetchRequestsByWalker();
      } catch (error) {
        this.error = "Failed to reject request";
      }
    },
    // owner
    async handleCancel(requestId) {
      try {
        await this.requestStore.cancelRequestByOwner(requestId);
        // Refresh requests
        await this.requestStore.fetchRequestsByOwner();
      } catch (error) {
        this.error = "Failed to cancel request";
      }
    },
    getStatusClass(status) {
      return {
        'text-warning': status === 'pending',
        'text-success': status === 'accepted',
        'text-danger': status === 'rejected'
      };
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Requests</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="requests.length === 0" class="text-center">
      <p>No requests found.</p>
    </div>

    <div v-else class="row">
      <!-- Walker View -->
      <div v-if="isWalker" class="col-12">
        <div v-for="request in requests" :key="request.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Request from {{ request.owner_name }}</h5>
            <div class="card-text">
              <p><strong>Dog:</strong> {{ request.dog_name }}</p>
              <p><strong>Breed:</strong> {{ request.dog_breed }}</p>
              <p><strong>Age:</strong> {{ request.dog_age }}</p>
              <p><strong>Size:</strong> {{ request.dog_size }}</p>
              <p><strong>Start Time:</strong> {{ request.formatted_start_time }}</p>
              <p><strong>End Time:</strong> {{ request.formatted_end_time }}</p>
              <p><strong>Status:</strong> <span :class="getStatusClass(request.status)">{{ request.status }}</span></p>
            </div>
            <div v-if="request.status === 'pending'" class="mt-3">
              <button @click="handleAccept(request.id)" class="btn btn-success me-2">Accept</button>
              <button @click="handleReject(request.id)" class="btn btn-danger">Reject</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Owner View -->
      <div v-else class="col-12">
        <div v-for="request in requests" :key="request.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Request to {{ request.walker_name }}</h5>
            <div class="card-text">
              <p><strong>Dog:</strong> {{ request.dog_name }}</p>
              <p><strong>Start Time:</strong> {{ request.formatted_start_time }}</p>
              <p><strong>End Time:</strong> {{ request.formatted_end_time }}</p>
              <p><strong>Status:</strong> <span :class="getStatusClass(request.status)">{{ request.status }}</span></p>
              <p><strong>Created:</strong> {{ request.formatted_created_at }}</p>
            </div>
            <div v-if="request.status === 'pending'" class="mt-3">
              <button @click="handleCancel(request.id)" class="btn btn-danger"> Cancel Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>