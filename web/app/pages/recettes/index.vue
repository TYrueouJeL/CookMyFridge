<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Liste des recettes</h1>

    <p v-if="loading" class="text-center">Chargement...</p>
    <p v-if="error" class="text-red-600 text-center">{{ error }}</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-2 mx-80">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../../components/RecipeCard.vue'

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
</script>
