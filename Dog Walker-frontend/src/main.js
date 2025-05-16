import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import MyDogs from "./components/MyDogs.vue";
import FindWalker from "./components/FindWalker.vue";
import Request from "./components/Request.vue";
import Appointments from "./components/Appointments.vue";
import "./assets/main.css";
import { createPinia } from "pinia";

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
  // my dogs page
  {
    path: "/mydogs",
    component: MyDogs,
  },
  // find walker page
  {
    path: "/findwalker",
    component: FindWalker,
  },

  // request page
  {
    path:"/request",
    component: Request,
  }

  //appointments page

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
// INITIALIZE pinia in our main.js file
// run query in terminal for pinia
app.use(createPinia());
app.mount("#app");
