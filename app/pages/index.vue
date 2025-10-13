<template>
  <div>
    <div v-if="currentUser.role === 'admin'">
      <AdminDashboard />
    </div>
    <div v-else>
      <TraineeDashboard />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

const currentUser = authStore.currentUser
</script>
