<script>

import {useAuthStore} from "@/stores/auth";

export default {
  name:"Register",
  data() {
    return {
      formData: {
        name:"",
        email:"",
        password:"",
        role:"",
      },
      error:null,
      success:null,
    };
    },
    setup(){
      const authStore=useAuthStore();
      return {authStore};
    },
    methods:{
      async handleSubmit() {
      try {
        this.error = null;
        if (!this.formData.role) {
          this.error = "Please select a role";
          return;
        }
        await this.authStore.register(this.formData);
        if (!this.authStore.error) {
          this.success = "Registration successful!";
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        } else {
          this.error = this.authStore.error;
        }
      } catch (err) {
        this.error = err.message;
      }
    }
    }
  }
</script>

<template>
  <div class="row d-flex justify-content-center align-items-start h-100 mt-5">
    <div class="col-md-6 col-lg-7 d-flex align-items-center">
      <div class="card-body p-4 p-lg-5 text-black">
        <form @submit.prevent="handleSubmit"> <!--prevents refreshing and runs handleSubmit -->
          <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px">
            Register for an account:
          </h5>

          <!-- Name Input -->
          <div class="form-outline mb-4">
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="form-control form-control-lg"
              required
            />
            <label class="form-label" for="name">Name</label>
          </div>

          <!-- Email Input -->
          <div class="form-outline mb-4">
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="form-control form-control-lg"
              required
            />
            <label class="form-label" for="email">Email address</label>
          </div>

          <!-- Password Input -->
          <div class="form-outline mb-4">
            <input
              v-model="formData.password"
              type="password"
              id="password"
              class="form-control form-control-lg"
              required
            />
            <label class="form-label" for="password">Password</label>
          </div>

          <!-- Role Selection -->
          <div class="form-outline mb-4">
            <select
              v-model="formData.role"
              class="form-select form-select-lg"
              required
            >
              <option value="">Select your role</option>
              <option value="owner">Dog Owner</option>
              <option value="walker">Dog Walker</option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="alert alert-success">
            {{ success }}
          </div>

          <!-- Register Button -->
          <div class="pt-1 mb-4 text-center">
            <button
              type="submit"
              class="btn btn-dark btn-lg btn-block"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
          </div>

          <!-- Login Link -->
          <p class="mb-5 pb-lg-2 text-center" style="color: #393f81">
            Already have an account?
            <RouterLink to="/login" style="color: #393f81">
              Login here!
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>