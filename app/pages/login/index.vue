<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4 p-6">
    <h1 class="text-4xl font-bold mb-16">PulseUP</h1>
    <form class="flex flex-col gap-4 w-full max-w-[400px]" @submit.prevent="login">
      <input type="text" placeholder="Email" class="bg-gray-900 text-[18px] rounded p-3 focus:outline-none" />
      <input type="password" placeholder="Password" class="bg-gray-900 text-[18px] rounded p-3 focus:outline-none" />
      <button type="submit" class="bg-pulse-red text-white font-semibold p-3 rounded">Iniciar sesión</button>
    </form>
    <NuxtLink href="/" class="text-gray-500 hover:text-pulse-red">Olvidaste tu contraseña?</NuxtLink>
  </div>
</template>

<script setup>
const login = () => {
  console.log('login')
  navigateTo('/')
}
</script>