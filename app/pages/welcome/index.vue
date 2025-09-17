<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4 p-6">
    <section class="flex flex-col items-center gap-6 p-4 max-w-2xl mx-auto w-full">
      <h1 class="text-2xl font-semibold text-center">Listo {{ currentUser?.name }}! &nbsp; 💪</h1>
      <p v-if="currentUser?.role === 'admin'" class="text-center">Ya podes crear tu team y llevarlo al siguiente nivel!</p>
      <p v-if="currentUser?.role === 'trainer'" class="text-center">Ya podes conocer a tus trainees y acompañarlos en su viaje!</p>
      <p v-if="currentUser?.role === 'trainee'" class="text-center">Ya  podes conocer a tu team y comenzar a entrenar</p>

      <div class="flex justify-center">
        <NuxtLink to='/'>
          <Button>{{ currentUser?.role === 'admin' ? 'Crear team' : 'Conocé tu team' }}</Button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { currentUser } = useAuthStore()
</script>