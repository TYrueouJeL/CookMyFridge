<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4 text-center">Détails de la recette</h1>

    <p v-if="pending" class="text-center">Chargement...</p>
    <p v-if="error" class="text-red-600 text-center">{{ error.message }}</p>

    <div v-if="recipe" class="text-center">
      <h2 class="text-2xl font-semibold">{{ recipe.name }}</h2>
      <p>ID : {{ recipe.id }}</p>
      <p>Créée le : {{ recipe.createdAt }}</p>
      <p>Dernière mise à jour : {{ recipe.updatedAt }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: recipe, pending, error } = await useAsyncData(
  () => `recipe-${route.params.id}`,
  () => $fetch(`http://localhost:3333/recipes/${route.params.id}`)
)
</script>
