<template>
  <AvatarRoot class="bg-pulse-gray inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle border-2 border-pulse-primary">
    <AvatarImage 
      :src="src" 
      alt="User pic"
      class="h-full w-full rounded-[inherit] object-cover" 
    />
  </AvatarRoot>
</template>

<script setup>
import { AvatarImage, AvatarRoot } from 'reka-ui';

const { src } = defineProps({
  src: {
    type: String,
    default: `/users/avatar${Math.floor(Math.random() * 4) + 1}.png`
  }
})
</script>
