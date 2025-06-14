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
    },
    pendingRequests() {
      return this.requests.filter(request => request.status === 'pending');
    },
    historicRequests() {
      return this.requests.filter(request => request.status !== 'pending');
    }
  },
  async created() {
    this.loading = true;
    try {
      if(!this.authStore.user){
        await this.authStore.fetchUser();
      }
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
    <div class="text-center mb-4">
      <h2>My Requests</h2>
    </div>

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

    <div v-else>
      <!-- Simple Tabs -->
      <ul class="nav nav-tabs nav-fill mb-4" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#pending" type="button">
            Pending ({{ pendingRequests.length }})
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#historic" type="button">
            Historic ({{ historicRequests.length }})
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Pending Requests -->
        <div class="tab-pane fade show active" id="pending">
          <div v-if="pendingRequests.length === 0" class="text-center text-muted">
            No pending requests
          </div>
          <div v-else>
            <!-- Walker View - Pending -->
            <div v-if="isWalker">
              <div v-for="request in pendingRequests" :key="request.id" class="card mb-3 border-warning">
                <div class="card-body text-center">
                  <h5 class="card-title mb-3">Request from {{ request.owner_name }}</h5>
                  <div class="row mb-3">
                    <div class="col-6">
                      <p><strong>Dog:</strong> {{ request.dog_name }}</p>
                      <p><strong>Breed:</strong> {{ request.dog_breed }}</p>
                    </div>
                    <div class="col-6">
                      <p><strong>Age:</strong> {{ request.dog_age }}</p>
                      <p><strong>Size:</strong> {{ request.dog_size }}</p>
                    </div>
                  </div>
                  <p class="mb-3"><strong>Time:</strong> {{ request.formatted_start_time }} - {{ request.formatted_end_time }}</p>
                  <div>
                    <button @click="handleAccept(request.id)" class="btn btn-success btn-sm me-2">Accept</button>
                    <button @click="handleReject(request.id)" class="btn btn-danger btn-sm">Reject</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Owner View - Pending -->
            <div v-else>
              <div v-for="request in pendingRequests" :key="request.id" class="card mb-3 border-warning">
                <div class="card-body">
                  <h5 class="card-title">Request to {{ request.walker_name }}</h5>
                  <div class="row">
                    <div class="col-md-8">
                      <p><strong>Dog:</strong> {{ request.dog_name }}</p>
                      <p><strong>Time:</strong> {{ request.formatted_start_time }} - {{ request.formatted_end_time }}</p>
                    </div>
                    <div class="col-md-4 text-end">
                      <button @click="handleCancel(request.id)" class="btn btn-outline-danger btn-sm">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Historic Requests -->
        <div class="tab-pane fade" id="historic">
          <div v-if="historicRequests.length === 0" class="text-center text-muted">
            No historic requests
          </div>
          <div v-else>
            <!-- Walker View - Historic -->
            <div v-if="isWalker">
              <div v-for="request in historicRequests" :key="request.id" class="card mb-3">
                <div class="card-body text-center">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="card-title mb-0">Request from {{ request.owner_name }}</h5>
                    <span :class="getStatusClass(request.status)" class="fw-bold">{{ request.status }}</span>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <p><strong>Dog:</strong> {{ request.dog_name }}</p>
                      <p><strong>Breed:</strong> {{ request.dog_breed }}</p>
                    </div>
                    <div class="col-6">
                      <p><strong>Age:</strong> {{ request.dog_age }}</p>
                      <p><strong>Size:</strong> {{ request.dog_size }}</p>
                    </div>
                  </div>
                  <p><strong>Time:</strong> {{ request.formatted_start_time }} - {{ request.formatted_end_time }}</p>
                </div>
              </div>
            </div>

            <!-- Owner View - Historic -->
            <div v-else>
              <div v-for="request in historicRequests" :key="request.id" class="card mb-3">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title">Request to {{ request.walker_name }}</h5>
                    <span :class="getStatusClass(request.status)" class="fw-bold">{{ request.status }}</span>
                  </div>
                  <p><strong>Dog:</strong> {{ request.dog_name }}</p>
                  <p><strong>Time:</strong> {{ request.formatted_start_time }} - {{ request.formatted_end_time }}</p>
                </div>
              </div>
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
  transform: translateY(-2px);
}
.nav-tabs .nav-link {
  cursor: pointer;
}
.border-warning {
  border-color: #ffc107 !important;
}
</style>