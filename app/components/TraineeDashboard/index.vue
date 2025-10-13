<template>
  <div class="flex flex-col h-full gap-6 p-4 max-w-2xl mx-auto w-full">
    <Header />

    <Card>
      <div v-if="daysUntilNextWorkout === 0" class="flex flex-col gap-2 bg-pulse-primary/10 rounded-r-lg">
        <p class="font-medium text-xl">Hoy toca entrenar! 🏋️</p>
        <p class="text-sm text-pulse-light-gray">No olvides calentar antes de comenzar.</p>
      </div>
      <div v-else class="flex flex-col gap-1">
        <p class="text-pulse-light-gray">Tu próximo entrenamiento es en:</p>
        <p class="text-2xl font-bold">{{ daysUntilNextWorkout }} {{ daysUntilNextWorkout === 1 ? 'día' : 'días' }}</p>
        <p class="text-sm text-pulse-light-gray">El {{ new Date(nextWorkout.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
      </div>
      
      <div class="mt-4">
        <div class="grid grid-cols-7 gap-1 text-center text-sm">
          <div 
            v-for="(day, index) in weekDays" 
            :key="index"
            class="flex flex-col items-center p-2 py-4 rounded-lg transition-colors"
            :class="{
              'bg-pulse-dark/20': day.hasWorkout,
              'opacity-50': day.isPast,
              'font-bold bg-pulse-red/10': day.isToday
            }"
          >
            <span class="text-xs text-pulse-light-gray">{{ day.name[0] }}</span>
            <span class="text-sm">{{ day.day }}</span>
            <div v-if="day.hasWorkout" class="mt-1">
              <svg v-if="day.isPast" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <div v-else class="h-2 w-2 rounded-full bg-pulse-primary"></div>
            </div>
            <div v-else class="h-2 w-2 rounded-full bg-pulse-light-gray/40 mt-1"></div>
          </div>
        </div>
      </div>
    </Card>

    <Card>
      <div class="flex items-center mb-4">
        <div class="p-2 rounded-lg bg-pulse-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pulse-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold">Próximo Entrenamiento</h2>
      </div>
      

      
      <div v-if="nextWorkout" class="space-y-2">
        <div class="flex items-center justify-between bg-pulse-dark/20 p-4 rounded-lg" v-for="(exercise, index) in nextWorkout.exercises" :key="index">
          <div class="flex items-center gap-4">
            <div class="bg-pulse-primary/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pulse-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">{{ exercise.name }}</h3>
              <p class="text-sm text-pulse-light-gray">{{ exercise.sets }} series × {{exercise.reps}} repeticiones</p>
            </div>
          </div>
        </div>
        <div class="flex">
          <Button variant="link" class="w-full">Ver completo</Button>
        </div>
      </div>
      <div v-else class="text-center py-6 flex flex-col gap-4">
        <p class="text-pulse-light-gray">No hay entrenamientos programados</p>
        <Button>
          Crear rutina
        </Button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const nextWorkoutDate = ref(new Date().setDate(new Date().getDate() + 1))

const nextWorkout = {
  date: nextWorkoutDate.value,
  exercises: [
    { name: 'Press de Banca ', sets: 4, reps: '8-10' },
    { name: 'Press Militar', sets: 3, reps: '10-12' },
    { name: 'Vuelos Laterales', sets: 3, reps: '12-15' },
  ]
};

const today = new Date()

const weekDays = computed(() => {
  const week = []
  
  const workoutDays = [2, 3, 5, 6]

  for (let i = -3; i <= 3; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const dayOfWeek = date.getDay()
    const dayOfMonth = date.getDate()
    const isPast = date < today && date.getDate() !== today.getDate()
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
    
    week.push({
      name: date.toLocaleDateString('es-AR', { weekday: 'long' }),
      day: dayOfMonth,
      hasWorkout: workoutDays.includes(dayOfWeek),
      isPast,
      isToday,
      date: date.toISOString().split('T')[0]
    })
  }
  
  return week
})

const daysUntilNextWorkout = computed(() => {
  const workoutDate = new Date(nextWorkout.date);
  const diffTime = workoutDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
</script>
