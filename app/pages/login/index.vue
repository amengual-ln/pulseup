<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4 p-6">
    <h1 class="text-4xl font-bold mb-16">PulseUP</h1>
    <form class="flex flex-col gap-4 w-full max-w-[400px]" @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Usuario" class="bg-gray-900 text-[18px] rounded p-3 focus:outline-none" />
      <input v-model="password" type="password" placeholder="Password" class="bg-gray-900 text-[18px] rounded p-3 focus:outline-none" />
      <Button type="submit">Iniciar sesión</Button>
    </form>
    <NuxtLink href="/" class="text-gray-500 hover:text-pulse-red">Olvidaste tu contraseña?</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    if (!username.value) {
      error.value = 'Por favor ingrese usuario y contraseña'
      return
    }

    const success = await authStore.login(username.value, password.value)
    
    if (success) {
      router.push('/')
    } else {
      error.value = 'Credenciales inválidas'
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión. Por favor intente nuevamente.'
  } finally {
    loading.value = false
    if (error.value) {
      toast(error.value)
    }
  }
}
</script>