<script>
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Profile",
  data() {
    return {
      editing: false,
      newPassword: "",
      imagePreview: null,
      success: null,
      localProfile: {
        name: "",
        email: "",
        profile_picture: null,
        price: "",
        experience: "",
      },
    };
  },
  computed: {
    profileStore() {
      return useProfileStore();
    },
    authStore() {
      return useAuthStore();
    },
    profile() {
      return this.profileStore.getProfile;
    },
    loading() {
      return this.profileStore.loading;
    },
    error() {
      return this.profileStore.error;
    },
    userId() {
      return this.authStore.user?.id;
    },
    isWalker() {
      return this.authStore.user?.role === "walker";
    },
    defaultImage() {
      return "https://placehold.co/150x150?text=No+Image";
    },
  },
  async created() {
    // Fetch profile data on component creation
    if (this.userId) {
      await this.profileStore.fetchProfile(this.userId);
      this.setLocalProfile();
    }
  },
  watch: {
    // Update local profile when store profile changes
    profile: {
      handler() {
        this.setLocalProfile();
      },
      immediate: true,
    },
    userId: {
      handler(newId) {
        if (newId) {
          this.profileStore.fetchProfile(newId);
        }
      },
    },
  },
  methods: {
    /**
     * Set local editable profile fields from store profile
     */
    setLocalProfile() {
      if (this.profile) {
        this.localProfile = { ...this.profile };
        this.imagePreview = this.profile.profile_picture;
      }
    },
    /**
     * Start editing the profile
     */
    startEdit() {
      this.editing = true;
      this.success = null;
      this.newPassword = "";
    },
    /**
     * Cancel editing and reset local fields
     */
    cancelEdit() {
      this.editing = false;
      this.setLocalProfile();
      this.newPassword = "";
    },
    /**
     * Handle profile image file input change
     * @param {Event} e
     */
    handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imagePreview = event.target.result;
          this.localProfile.profile_picture = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    /**
     * Save updated profile to backend
     */
    async saveProfile() {
      try {
        this.success = null;
        const updateData = {
          name: this.localProfile.name,
          email: this.localProfile.email,
          profile_picture: this.localProfile.profile_picture,
        };
        if (this.isWalker) {
          updateData.price = this.localProfile.price;
          updateData.experience = this.localProfile.experience;
        }
        if (this.newPassword) {
          updateData.password = this.newPassword;
        }
        await this.profileStore.updateProfile(this.userId, updateData);
        this.success = "Profile updated successfully!";
        this.editing = false;
      } catch (e) {
        // Error is handled by the store
      }
    },
    /**
     * Handle image load error and show default image
     */
    handleImageError() {
      this.imagePreview = this.defaultImage;
    },
  },
};
</script>

<template>
  <div class="container mt-5" style="max-width: 600px;">
    <h2 class="mb-4">My Profile</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>
      <div v-if="!editing">
        <div class="text-center mb-3">
          <img
            :src="profile?.profile_picture || defaultImage"
            alt="Profile Picture"
            class="rounded-circle"
            style="width: 150px; height: 150px; object-fit: cover;"
            @error="handleImageError"
          />
        </div>
        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>Name:</strong> {{ profile?.name }}</li>
          <li class="list-group-item"><strong>Email:</strong> {{ profile?.email }}</li>
          <li v-if="isWalker" class="list-group-item"><strong>Price:</strong> {{ profile?.price }} €</li>
          <li v-if="isWalker" class="list-group-item"><strong>Experience:</strong> {{ profile?.experience }} years</li>
        </ul>
        <button class="btn btn-primary" @click="startEdit">Edit Profile</button>
      </div>
      <div v-else>
        <form @submit.prevent="saveProfile">
          <div class="mb-3 text-center">
            <img
              :src="imagePreview || defaultImage"
              alt="Profile Picture"
              class="rounded-circle mb-2"
              style="width: 150px; height: 150px; object-fit: cover;"
              @error="handleImageError"
            />
            <input type="file" class="form-control mt-2" @change="handleImageChange" accept="image/*" />
          </div>
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="localProfile.name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="localProfile.email" type="email" class="form-control" required />
          </div>
          <div v-if="isWalker" class="mb-3">
            <label class="form-label">Price (€)</label>
            <input v-model="localProfile.price" type="number" class="form-control" min="0" />
          </div>
          <div v-if="isWalker" class="mb-3">
            <label class="form-label">Experience (years)</label>
            <input v-model="localProfile.experience" type="number" class="form-control" min="0" />
          </div>
          <div class="mb-3">
            <label class="form-label">New Password</label>
            <input v-model="newPassword" type="password" class="form-control" placeholder="New password (optional)" />
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="loading">
              {{ loading ? "Saving..." : "Save" }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  font-size: 1.1rem;
}
</style>