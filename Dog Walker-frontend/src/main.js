import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

const routes = [
  // login page
  {
    path: "/login",
    component: Login,
  },
  // register page
  {
    path: "/register",
    component: Register,
  },
  // home page
  {
    path: "/",
    component: Home,
  },
  // about page
  {
    path: "/about",
    component: About,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
