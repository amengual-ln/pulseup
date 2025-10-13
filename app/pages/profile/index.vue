<template>
  <div class="flex flex-col h-full gap-6 p-4 max-w-2xl mx-auto w-full">
    <div class="grid grid-cols-3">
      <NuxtLink to="/">
        <Button variant="link">Volver</Button>
      </NuxtLink>
      <div class="grid place-items-center">
        <Avatar />
      </div>
    </div>
    <div class="grid mt-6">
      <Button @click="logout">Cerrar sesión</Button>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

const logout = () => {
    authStore.logout()
    navigateTo('/login')
}
</script>