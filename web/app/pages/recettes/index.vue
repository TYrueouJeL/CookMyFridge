<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Liste des recettes</h1>

    <AsyncState :loading="loading" :error="error">
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 justify-items-center p-2 mx-80">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          class="mb-6 break-inside-avoid"
        />
      </div>
    </AsyncState>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../../components/RecipeCard.vue'
import AsyncState from '~/components/AsyncState.vue'

const recipes = ref([])
const loading = ref(true)
const error = ref(null)

const fetchRecipes = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch('http://localhost:3333/recipes/')
    if (!res.ok) throw new Error('Erreur lors de la récupération des recettes')
    const data = await res.json()
    recipes.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecipes()
})

useHead(() => ({
  title: 'Liste des recettes'
}))
</script>
