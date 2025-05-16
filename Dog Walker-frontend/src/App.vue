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
  <div class="page-container">
    <Navbar v-if="$route.path !== '/login' && $route.path !== '/register'" />
    <div class="content-wrap">
      <main>
        <RouterView />
      </main>
    </div>
    <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" />
  </div>
</template>

<style>
.page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrap {
  flex: 1 0 auto;
  padding-bottom: 2.5rem;
}
</style>