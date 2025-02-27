<script>
</script>

<template>
<div class="row d-flex justify-content-center align-items-start h-100 mt-5">
            <!-- Picture Section -->
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="../assets/images/loginImage.avif"
                alt="login form"
                class="img-fluid"
                style="border-radius: 1rem 0 0 1rem"
              />
            </div>
            <!-- Picture Section End -->

            <!-- Login Form Section -->
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">
                
                <!-- Login Form -->
                <form>
                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px"> Sign into your account:  </h5>
  
                  <!-- Email Input -->
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="email" class="form-control form-control-lg" />
                    <label class="form-label" for="email">Email address</label>
                  </div>
  
                  <!-- Password Input -->
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">Password</label>
                  </div>
  
                  <!-- Login Button -->
                  <div class="pt-1 mb-4">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-dark btn-lg btn-block"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
  
                  <!-- Register -->
                  <p class="mb-5 pb-lg-2"> Don't have an account?
                    <RouterLink to="/register" style="color: #393f81">Register here!</RouterLink>
                  </p>
                </form>
                <!-- Login Form End -->
  
              </div>
            </div>
            <!-- Login Form Section End -->
          </div>
  </template>
  
