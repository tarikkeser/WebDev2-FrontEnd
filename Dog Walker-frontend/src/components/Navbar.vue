<script></script>

<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand">
        <img src="../assets/images/logo.jpg" alt="Logo" width="100" height="80">
      </a>

      <!-- Bootstrap Hamburger Menu Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu -->
      <!--You will add something here based on script and user Session
      For example; if its logged show logout button, if not show login button 
      and show profile button if logged in--> 
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto ">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About Us</RouterLink>
          </li>
            <li class="nav-item">
             <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #e6830b;
  width: 90%;
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
  font-size: 1.3rem;
  margin: 0 40px;
}
.navbar-nav .nav-link:hover {
  color: #ffffff;
}
</style>
