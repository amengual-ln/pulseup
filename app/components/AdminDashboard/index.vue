<template>
  <div class="flex flex-col h-full gap-6 p-4 max-w-2xl mx-auto w-full">
    <Header />

    <Card>
      <h2 class="text-xl font-semibold mb-4">Tus equipos</h2>

      <div v-if="isLoading" class="text-center py-6">
        <p>Cargando equipos...</p>
      </div>
      <div v-else-if="userTeams.length">
        <ul class="space-y-3">
          <li v-for="team in userTeams" :key="team.id" class="p-3 border rounded-lg hover:bg-gray-50">
            <h3 class="font-medium">{{ team.name }}</h3>
            <p class="text-sm text-gray-500">{{ team.description }}</p>
          </li>
        </ul>
      </div>
      <div v-else class="text-center py-6 flex flex-col gap-4">
        <p class="text-pulse-light-gray py-8">No tenés ningún equipo aún...</p>
        <Button>
          Crea tu primer equipo!
        </Button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useTeamStore } from '~/stores/team';

const authStore = useAuthStore()
const teamStore = useTeamStore()

const currentUser = authStore.currentUser
const userTeams = ref<Array>([])
const isLoading = ref(false)

const fetchTeams = async () => {
  if (!currentUser?.id) return
  
  isLoading.value = true
  try {
    await teamStore.fetchUserTeams(currentUser.id)
    // Usamos el getter userTeams del store para obtener los equipos del usuario
    userTeams.value = teamStore.userTeams(currentUser.id)
  } catch (error) {
    console.error('Error al cargar los equipos:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTeams()
})
</script>
