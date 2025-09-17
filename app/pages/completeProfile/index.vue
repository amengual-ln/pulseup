<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4 p-6">
    <h1 class="text-2xl font-semibold text-center">Bienvenido! 🎉</h1>
    <p>Como es tu primera vez por acá, necesitamos que completes tu perfil</p>
    <form class="flex flex-col gap-4 w-full max-w-[400px] my-6" @submit.prevent="handleOk">
      <input ref="focusInput" v-model="name" type="text" placeholder="Nombre / Apodo" class="bg-gray-900 text-[18px] rounded p-3 focus:outline-none" />

      <Button type="submit">Listo!</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { currentUser, updateCurrentUser } = useAuthStore()
const { updateUser } = useUsersStore()

const focusInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  focusInput.value?.focus()
})

const name = ref('')

const handleOk = async () => {
  if (!currentUser) return

  const success = await updateUser(currentUser.id, { 
    firstLogin: false, 
    name: name.value 
  })
  
  if (success) {
    updateCurrentUser({ 
      ...currentUser, 
      firstLogin: false, 
      name: name.value 
    })
    navigateTo('/welcome')
  }
}
</script>