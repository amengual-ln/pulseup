<template>
      <button 
        :variant="variant" 
        :class="`font-semibold p-3 rounded 
          ${variant === 'primary' ? 'bg-pulse-red text-white' 
          : variant === 'secondary' ? 'bg-pulse-red/20 text-pulse-red' 
          : variant === 'link' ? 'text-pulse-red hover:text-pulse-red/80' 
          : 'bg-pulse-primary text-white'}`">
        <slot />
      </button>
</template>

<script setup>
const { variant = 'primary' } = defineProps({
  variant: {  
    type: String,
    options: ['primary', 'secondary', 'link']
  }
})
</script>