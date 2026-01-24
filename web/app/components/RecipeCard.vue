<template>
  <div class="border border-gray-300 shadow-md hover:-translate-0.5 transition duration-300 rounded-lg p-2 pb-4 w-full">
    <p class="mb-2 select-none">{{ recipe.name }}</p>
    <RouterLink
      class="border border-green-400 rounded-lg p-2 bg-green-100 hover:bg-green-300 cursor-pointer select-none transition duration-300"
      :to="`/recettes/${recipe.id}`"
    >
    Plus d'infos
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>
