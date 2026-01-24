<template>
  <RouterLink
    class="w-full border border-green-400 shadow-lg rounded-lg p-2 bg-green-100 hover:bg-green-300 cursor-pointer select-none transition duration-300"
    :to="`/recettes/${recipe.id}`"
  >
    {{ recipe.name }}
  </RouterLink>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>
