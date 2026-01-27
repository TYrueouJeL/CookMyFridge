<template>
  <div class="p-6 mx-80">
    <h1 class="text-3xl font-bold mb-4 text-center">Détails de la recette</h1>

    <AsyncState :loading="loading" :error="error">
      <div v-if="recipe" class="text-center">
        <h2 class="text-2xl font-semibold mb-4">{{ recipe.name }}</h2>
        <div class="grid grid-cols-3">
          <div class="col-span-2 row-span-2 m-1">
            <img src="https://foodish-api.com/images/pasta/pasta33.jpg" class="rounded-lg"/>
          </div>
          
          <div class="border border-gray-300 rounded-lg m-1 p-2 row-span-2">
            <p class="text-lg font-bold">Description : </p>
            <p>{{ recipe.description }}</p>
          </div>

          <div>
            <RouterLink
          v-if="isAuthenticated"
            :to="`/recettes/${recipe.id}/ingredients/add`"
            class="border border-gray-400 hover:bg-gray-200 rounded-lg m-1 px-3 py-2 flex items-center justify-center text-center h-min"
            >
              Ajouter un ingredient
            </RouterLink>
          </div>

          <div class="grid grid-cols-2 gap-4 border rounded-lg border-green-300 p-2 col-span-2 m-1 h-min">
            <p class="text-lg font-bold col-span-3">Ingrédients</p>
            <div class="border rounded-lg border-green-300 p-2 h-min" v-for="ingredient in recipe.ingredients">
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
import RecipeService from '~/services/api/recipeApi'
import { useAuth } from '../../../composables/useAuth';

const { isAuthenticated } = useAuth()

const route = useRoute()

const { data: recipe, pending: loading, error } = await useAsyncData(
  () => `recipe-${route.params.id}`,
  () => RecipeService.getById(Number(route.params.id))
)

useHead(() => ({
  title: recipe.value
    ? `${recipe.value.name} - Détails de la recette`
    : 'Détails de la recette'
}))
</script>