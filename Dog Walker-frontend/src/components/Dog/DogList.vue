<script>
import DogCard from "../Dog/DogCard.vue";
import { useDogStore } from "@/stores/dog";
import { useAuthStore } from "@/stores/auth";
// check the options API structure.
export default {
  name: "DogList",
  components: {
    DogCard,
  },
  data() {
    return {
      dogStore: useDogStore(),
      authStore: useAuthStore(),
      formData: {
        name: "",
        breed: "",
        age: "",
        size: "",
        photo: "",
      },
      showForm: false,
      editingDog: null,
      error: null,
    };
  },
  computed: {
    dogs() {
      return this.dogStore.allDogs;
    },
  },
  mounted() {
    if (this.authStore.user) {
      this.loadDogs();
    }
    this.$watch(
      () => this.authStore.user,
      (user) => {
        if (user && user.id) {
          this.loadDogs();
        }
      }
    );
  },
  methods: {
    async loadDogs() {
      try {
        if (!this.authStore.user?.id) {
          console.log("No user found");
          return;
        }
        await this.dogStore.fetchDogsByOwner(this.authStore.user.id);
      } catch (error) {
        console.error("Error loading dogs:", error);
        this.error = "Failed to fetch dogs";
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    toggleForm(dog = null) {
      this.showForm = !this.showForm;
      if (dog) {
        this.editingDog = dog;
        this.formData = { ...dog };
      } else {
        this.editingDog = null;
        this.formData = { name: "", breed: "", age: "", size: "", photo: "" };
      }
    },
    async handleSubmit() {
      try {
        this.error = null;
        if (this.editingDog) {
          await this.dogStore.updateDog(this.editingDog.id, this.formData);
        } else {
          await this.dogStore.createDog({
            ...this.formData,
            ownerId: this.authStore.user.id,
          });
        }
        this.showForm = false;
        this.editingDog = null;
        this.formData = { name: "", breed: "", age: "", size: "", photo: "" };
        await this.loadDogs();
      } catch (e) {
        this.error = "Failed to save dog";
      }
    },
    async handleDelete(dogId) {
      if (confirm("Are you sure you want to delete this dog?")) {
        await this.dogStore.deleteDog(dogId);
        await this.loadDogs();
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="mb-4">
      <button @click="toggleForm()" class="btn btn-primary">
        {{ showForm ? "Cancel" : "Add New Dog" }}
      </button>
    </div>

    <!-- Add/Update Dog Form -->
    <div v-if="showForm" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">
          {{ editingDog ? "Update Dog" : "Add New Dog" }}
        </h5>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="breed" class="form-label">Breed</label>
            <input
              v-model="formData.breed"
              type="text"
              class="form-control"
              id="breed"
              required
            />
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input
              v-model="formData.age"
              type="number"
              class="form-control"
              id="age"
              required
              min="0"
            />
          </div>
          <div class="mb-3">
            <label for="size" class="form-label">Size</label>
            <select
              v-model="formData.size"
              class="form-control"
              id="size"
              required
            >
              <option value="">Select size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="photo" class="form-label">Dog Image</label>
            <input
              type="file"
              class="form-control"
              id="photo"
              @change="handleImageUpload"
              accept="image/*"
            />
          </div>
          <button type="submit" class="btn btn-success">
            {{ editingDog ? "Update Dog" : "Add Dog" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Dogs List -->
    <div v-if="dogStore.loading" class="text-center">Loading...</div>

    <div v-if="!dogStore.loading && !dogStore.error" class="card-container">
      <DogCard
        v-for="dog in dogs"
        :key="dog.id"
        :photo="dog.photo"
        :name="dog.name"
        :breed="dog.breed"
        :age="dog.age"
        :size="dog.size"
      >
        <template #actions>
          <div class="action-buttons">
            <button class="btn btn-warning btn-sm" @click="toggleForm(dog)">
              Edit
            </button>
            <button class="btn btn-danger btn-sm" @click="handleDelete(dog.id)">
              Delete
            </button>
          </div>
        </template>
      </DogCard>
    </div>
  </div>
</template>
<style scoped>

.action-buttons {
  display:flex;
  justify-content: center;
  gap:8px;
}
.card-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  padding: auto;
}

.btn-primary {
  background-color: #e6830b;
  border: none;
}

.btn-primary:hover {
  background-color: #d17609;
}

.card {
  max-width: 500px;
  margin: 0 auto;
}

</style>
