<script></script>

<template>
  <div class="row d-flex justify-content-center align-items-start h-100 mt-5">
    <!-- Register Form Section -->
    <div class="col-md-6 col-lg-7 d-flex align-items-center">
      <div class="card-body p-4 p-lg-5 text-black">
        <!-- Register Form -->
        <form>
          <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px">
            Register for an account:
          </h5>
          <!-- Email Input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="name"
              id="name"
              class="form-control form-control-lg"
            />
            <label class="form-label" for="email">Name</label>
          </div>
          <!-- Email Input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="email"
              id="email"
              class="form-control form-control-lg"
            />
            <label class="form-label" for="email">Email address</label>
          </div>

          <!-- Password Input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="password"
              id="password"
              class="form-control form-control-lg"
            />
            <label class="form-label" for="password">Password</label>
          </div>

          <!-- Login Button -->
          <div class="pt-1 mb-4 text-center">
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-dark btn-lg btn-block"
              type="button"
            >
              Register
            </button>
          </div>

          <!-- Register -->
          <p class="mb-5 pb-lg-2 text-center" style="color: #393f81">
            Already have an account?
            <RouterLink to="/login" style="color: #393f81"
              >Login here!</RouterLink
            >
          </p>
        </form>
        <!-- Login Form End -->
      </div>
    </div>
    <!-- Login Form Section End -->
  </div>
</template>
