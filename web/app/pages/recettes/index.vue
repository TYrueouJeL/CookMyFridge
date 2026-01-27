<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Liste des recettes</h1>

    <div class="border border-green-300 rounded-lg p-4 mb-2 max-w-md mx-auto text-center">
      <input
      type="text"
      v-model="searchQuery"
      class="border border-green-400 focus:outline-none focus:ring focus:ring-green-500 rounded-lg p-1.5 mx-1"
      placeholder="Pizza Margherita"
      >
      </input>
      <RouterLink
      :to="`/recettes/create`"
      class="border border-green-400 bg-green-100 hover:bg-green-300 rounded-lg p-2 mx-1"
      >
        Ajouter une recette
      </RouterLink>
    </div>

    <AsyncState :loading="loading" :error="error">
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 justify-items-center p-2 mx-80">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          class="mb-6 break-inside-avoid"
        />
      </div>
    </AsyncState>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import RecipeCard from '../../components/RecipeCard.vue'
import AsyncState from '~/components/AsyncState.vue'

const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

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

const filteredRecipes = computed(() => {
  if (!searchQuery.value.trim()) {
    return recipes.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return recipes.value.filter(recipe => 
    recipe.name.toLowerCase().includes(query)
  )
})

onMounted(() => {
  fetchRecipes()
})

useHead(() => ({
  title: 'Liste des recettes'
}))
</script>
