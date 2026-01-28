<template>
  <div class="border border-gray-300 shadow-md hover:-translate-0.5 hover:shadow-md transition duration-300 rounded-lg p-4 w-full flex flex-col h-full">
    <img src="https://foodish-api.com/images/pasta/pasta33.jpg" class="rounded-lg mb-2"/>
    <p class="mb-2 select-none text-lg font-bold text-center truncate">{{ recipe.name }}</p>
    <p class="mb-4 select-none line-clamp-3">{{ recipe.description }}</p>
    <div class="flex justify-center mt-auto">
      <RouterLink
        class="border border-green-400 rounded-lg p-2 bg-green-100 hover:bg-green-300 cursor-pointer select-none transition duration-300"
        :to="`/recettes/${recipe.id}`"
      >
      Plus d'infos
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeType } from '../types/RecipeType';

defineProps({
  recipe: {
    type: Object as () => RecipeType,
    required: true
  }
})
</script>
