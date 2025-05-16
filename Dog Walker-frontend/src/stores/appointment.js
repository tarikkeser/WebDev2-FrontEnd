import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointments: [],
    loading: false,
    error: null,
  }),
  getters: {
    getAppointments: (state) => state.appointments,
  },
  actions: {
    // get appointments by owner
    async fetchAppointmentsByOwner() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(`${API_ENDPOINTS.appointment}/owner`);
        this.appointments = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch appointments";
      } finally {
        this.loading = false;
      }
    },
    // get appointments by walker
    async fetchAppointmentsByWalker() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(`${API_ENDPOINTS.appointment}/walker`);
        this.appointments = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch appointments";
      } finally {
        this.loading = false;
      }
    },
    // cancel appointment by owner and walker.
    async cancelAppointment(appointmentId) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.delete(
          `${API_ENDPOINTS.appointment}/${appointmentId}`
        );
        this.appointments = this.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to cancel appointment";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
