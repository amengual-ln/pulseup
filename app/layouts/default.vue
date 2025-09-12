<template>
  <div>
    <nuxt-route-announcer />
    <nuxt-loading-indicator />
    <div class="bg-pulse-dark text-white h-screen font-custom">
      <main>
        <NuxtPage />
      </main>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>
