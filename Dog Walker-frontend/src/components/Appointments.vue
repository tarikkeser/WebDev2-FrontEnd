<script>
import { useAuthStore } from "@/stores/auth";
import { useAppointmentStore } from "@/stores/appointment";

export default {
  name: "Appointments",
  setup() {
    const authStore = useAuthStore();
    const appointmentStore = useAppointmentStore();
    return { authStore, appointmentStore };
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    isWalker() {
      return this.authStore.user?.role === "walker";
    },
    appointments() {
      return this.appointmentStore.getAppointments;
    }
  },
  async created() {
    this.loading = true;
    try {
      if (this.isWalker) {
        await this.appointmentStore.fetchAppointmentsByWalker();
      } else {
        await this.appointmentStore.fetchAppointmentsByOwner();
      }
    } catch (error) {
      this.error = "Failed to load appointments";
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleCancel(appointmentId) {
      try {
        if (confirm("Are you sure you want to cancel this appointment?")) {
          await this.appointmentStore.cancelAppointment(appointmentId);
          if (this.isWalker) {
            await this.appointmentStore.fetchAppointmentsByWalker();
          } else {
            await this.appointmentStore.fetchAppointmentsByOwner();
          }
        }
      } catch (error) {
        this.error = "Failed to cancel appointment";
      }
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Appointments</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="appointments.length === 0" class="text-center">
      <p>No appointments found.</p>
    </div>

    <div v-else class="row">
      <!-- Walker View -->
      <div v-if="isWalker" class="col-12">
        <div v-for="appointment in appointments" :key="appointment.appointment_id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Appointment with {{ appointment.owner_name }}</h5>
            <div class="card-text">
              <p><strong>Dog:</strong> {{ appointment.dog_name }}</p>
              <p><strong>Start Time:</strong> {{ appointment.formatted_start_time }}</p>
              <p><strong>End Time:</strong> {{ appointment.formatted_end_time }}</p>
            </div>
            <div class="mt-3">
              <button @click="handleCancel(appointment.appointment_id)" class="btn btn-danger">
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Owner View -->
      <div v-else class="col-12">
        <div v-for="appointment in appointments" :key="appointment.appointment_id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Appointment with {{ appointment.walker_name }}</h5>
            <div class="card-text">
              <p><strong>Dog:</strong> {{ appointment.dog_name }}</p>
              <p><strong>Start Time:</strong> {{ appointment.formatted_start_time }}</p>
              <p><strong>End Time:</strong> {{ appointment.formatted_end_time }}</p>
            </div>
            <div class="mt-3">
              <button @click="handleCancel(appointment.appointment_id)" class="btn btn-danger">
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger:hover {
  background-color: #bb2d3b;
  border-color: #b02a37;
}
</style>