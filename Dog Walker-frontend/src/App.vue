<script>
import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const route = useRoute();
    return { route }
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

</template>
