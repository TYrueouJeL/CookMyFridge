<template>
  <div class="p-6 mx-80">
    <h1 class="text-3xl font-bold mb-4 text-center">Détails de la recette</h1>

    <AsyncState :loading="loading" :error="error">
      <div v-if="recipe" class="text-center">
        <h2 class="text-2xl font-semibold mb-4">{{ recipe.name }}</h2>
        <div class="grid grid-cols-3">
          <div class="border border-gray-300 rounded-lg col-span-2 mx-2 h-min p-2">
            <p class="text-lg font-bold">Description : </p>
            <p>{{ recipe.description }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mx-2 border rounded-lg border-green-300 p-2">
            <p class="text-lg font-bold col-span-2">Ingrédients</p>
            <div class="border rounded-lg border-green-300 hover:bg-green-100 hover:-translate-0.5 transition duration 300 hover:shadow-lg shadow-lg p-2 h-min" v-for="ingredient in recipe.ingredients">
              <p>{{ ingredient.name }}</p>
              <p>Quantitée : {{ ingredient.quantity }}{{ ingredient.unit }}</p>
            </div>
          </div>
        </div>
      </div>
    </AsyncState>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: recipe, pending, error } = await useAsyncData(
  () => `recipe-${route.params.id}`,
  () => $fetch(`http://localhost:3333/recipes/${route.params.id}`)
)

useHead(() => ({
  title: recipe.value
    ? `${recipe.value.name} - Détails de la recette`
    : 'Détails de la recette'
}))
</script>