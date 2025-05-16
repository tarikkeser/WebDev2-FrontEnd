<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    isOwner() {
      return this.authStore.user?.role === 'owner'
    },
    isWalker() {
      return this.authStore.user?.role === 'walker'
    },
    currentUser() {
      return this.authStore.user
    }
  },
  methods: {
    async handleLogout() {
      await this.authStore.logout()
      this.$router.push('/login')
    }
  },

}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- Logo -->
      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/logo.jpg" alt="Logo" width="100" height="80">
      </RouterLink>

      <!-- Bootstrap Hamburger Menu Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
  
          <!-- Not authenticated -->
          <template v-if="!isAuthenticated">
              <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About Us</RouterLink>
          </li>
            <li class="nav-item">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
          </template>

          <!-- Authenticated -->
          <template v-if="isAuthenticated">
            <!-- Owner specific links -->
            <template v-if="isOwner">
              <li class="nav-item">
                <RouterLink to="/mydogs" class="nav-link">My Dogs</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/findwalker" class="nav-link">Find Walker</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/request" class="nav-link">My Requests</RouterLink>
              </li>
            </template>

            <!-- Walker specific links -->
            <template v-if="isWalker">
              <li class="nav-item">
                <RouterLink to="/requests" class="nav-link">Walk Requests</RouterLink>
              </li>
            </template>

            <!-- Common authenticated user links -->
            <li class="nav-item">
              <RouterLink to="/appointments" class="nav-link">Appointments</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
            </li>
            <li class="nav-item">
              <a @click="handleLogout" class="nav-link" style="cursor: pointer">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  background-color: #e6830b;
  width: 95%;
  margin: 20px auto;
  border-radius: 16px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}
.navbar-brand img {
  border-radius: 5px;
  object-fit: cover;
}
.navbar-nav .nav-link {
  color: #000;
  font-size: 1.2rem;
  margin: 0 40px;
}
.navbar-nav .nav-link:hover {
  color: #ffffff;
}
</style>
