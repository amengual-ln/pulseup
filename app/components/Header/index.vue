<template>
  <header class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">Hola {{ currentUser?.name }}!</h1>
      <p class="text-pulse-light-gray">{{ formattedDate }}</p>
    </div>
    <NuxtLink href="/profile" class="hover:opacity-80 transition-opacity">
      <Avatar />
    </NuxtLink>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

const currentUser = authStore.currentUser

const formattedDate = computed(() => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Date().toLocaleDateString('es-AR', options);
});
</script>