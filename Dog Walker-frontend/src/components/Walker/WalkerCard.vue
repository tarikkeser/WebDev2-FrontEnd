<script>
import { useDogStore } from "@/stores/dog";
import { useRequestStore } from "@/stores/request";
import { useAuthStore } from "@/stores/auth";

export default {
  props: {
    id: Number,
    image: String,
    name: String,
    experience: String,
    price: Number,
  },
  data() {
    return {
      imageError: false,
      defaultImage: "https://placehold.co/400x300?text=No+Image",
      showRequestForm: false,
      requestData: {
        dog_id: "",
        walker_id: null,
        start_time: "",
        end_time: "",
      },
      dogs: [],
      loading: false,
      error: null,
    };
  },
  setup() {
    const dogStore = useDogStore();
    const requestStore = useRequestStore();
    const authStore = useAuthStore();
    return { dogStore, requestStore, authStore };
  },
  async created() {
    if (this.authStore.user) {
      await this.loadDogs();
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true;
    },
    async loadDogs() {
      try {
        await this.dogStore.fetchDogsByOwner(this.authStore.user.id);
        this.dogs = this.dogStore.allDogs;
      } catch (error) {
        console.error("Error loading dogs:", error);
      }
    },
    showForm() {
      this.requestData.walker_id = this.id;
      this.showRequestForm = true;
    },
   async handleSubmit() {
  try {
    this.loading = true;
    const formattedData = {
      dog_id: parseInt(this.requestData.dog_id),
      walker_id: parseInt(this.id),
      start_time: this.requestData.start_time, 
      end_time: this.requestData.end_time 
    };
    await this.requestStore.sendRequestToWalker(formattedData);
    this.showRequestForm = false;
    this.requestData = {
      dog_id: '',
      walker_id: null,
      start_time: '',
      end_time: ''
    };
    alert('Request sent successfully!');
  } catch (error) {
    console.error('Request error:', error); // For debugging
    this.error = error.response?.data?.message || error.message;
  } finally {
    this.loading = false;
  }
},
  },
};
</script>

<template>
  <div class="card" style="width: 20rem">
    <img
      class="card-img-top"
      :src="imageError ? defaultImage : image || defaultImage"
      @error="handleImageError"
      :alt="name"
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">Experience: {{ experience }} Year</p>
      <p class="card-text">Price: {{ price }} Euro</p>
      <button class="btn btn-primary" @click="showForm">Send Request</button>
    </div>

    <!-- Request Form Modal -->
    <div v-if="showRequestForm" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Send Walk Request to {{ name }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="showRequestForm = false"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <!-- Dog Selection -->
              <div class="mb-3">
                <label class="form-label">Select Dog</label>
                <select
                  v-model="requestData.dog_id"
                  class="form-select"
                  required
                >
                  <option value="">Choose a dog</option>
                  <option v-for="dog in dogs" :key="dog.id" :value="dog.id">
                    {{ dog.name }}
                  </option>
                </select>
              </div>

              <!-- Start Time -->
              <div class="mb-3">
                <label class="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="requestData.start_time"
                  required
                />
              </div>

              <!-- End Time -->
              <div class="mb-3">
                <label class="form-label">End Time</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="requestData.end_time"
                  required
                />
              </div>

              <div v-if="error" class="alert alert-danger">{{ error }}</div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showRequestForm = false"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="loading"
                >
                  {{ loading ? "Sending..." : "Send Request" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showRequestForm" class="modal-backdrop show"></div>
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  margin: 1rem;
}
.card-img-top {
  height: 20rem;
  object-fit: cover;
}

.card-title {
  font-size: 1.5rem;
}
.card-text {
  font-size: 1rem;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
.modal {
  z-index: 1050;
}
</style>
