<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async handleSubmit() {
      try {
        this.error = null;
        await this.authStore.login(this.formData);
        if (!this.authStore.error) {
          this.$router.push("/");
        } else {
          this.error = this.authStore.error;
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<template>
  <div class="row d-flex justify-content-center align-items-start h-100 mt-5">
    <div class="col-md-6 col-lg-5 d-none d-md-block">
      <img
        src="../assets/images/loginImage.avif"
        alt="login form"
        class="img-fluid"
        style="border-radius: 1rem 0 0 1rem"
      />
    </div>

    <div class="col-md-6 col-lg-7 d-flex align-items-center">
      <div class="card-body p-4 p-lg-5 text-black">
        <form @submit.prevent="handleSubmit">
          <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
            Sign into your account
          </h5>

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

          <!-- Error Message -->
          <div v-if="error" class="alert alert-danger">
            {{ "User Name or Password is wrong!" }}
          </div>

          <!-- Login Button -->
          <div class="pt-1 mb-4">
            <button
              type="submit"
              class="btn btn-dark btn-lg btn-block"
              :disabled="authStore.isLoading"
            >
              {{ authStore.isLoading ? "Signing in..." : "Login" }}
            </button>
          </div>

          <!-- Register Link -->
          <p class="mb-5 pb-lg-2">
            Don't have an account?
            <RouterLink to="/register" style="color: #393f81">
              Register here!
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
