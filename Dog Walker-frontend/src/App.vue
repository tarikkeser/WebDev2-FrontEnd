<script>
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from '@/stores/auth';
import { useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";


export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    authStore.initializeAuth();
    
    return { route,authStore }
  },
};
</script>

<template>
  <Navbar v-if="$route.path !== '/login' && $route.path !== '/register'" />
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
  <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" />
</template>
