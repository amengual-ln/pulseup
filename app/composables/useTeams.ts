import { ref } from 'vue'
import type { Team } from '@/types/team'

export const useTeams = () => {
  const teams = ref<Team[]>([])
  const currentTeam = ref<Team | null>(null)

  const createTeam = async () => {
    console.log('Creando el team!')
  }

  const inviteToTeam = async (id: string, userReference: string) => {
    // Si el usuario No existe, solo aceptar mail
    console.log('Invitando al team al usuario con', (userReference.includes('@') ? 'email' : 'username'), userReference)
  }

  const getTeamMembers = async (id: string) => {
    console.log('Miembros del team!', id)
  }

  return {
    teams,
    currentTeam,
    createTeam,
    inviteToTeam,
    getTeamMembers,
  }
}