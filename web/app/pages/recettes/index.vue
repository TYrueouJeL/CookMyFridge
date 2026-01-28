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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-2 mx-80">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          class="mb-6 break-inside-avoid"
        />
      </div>

      <!-- Bouton "Charger plus" -->
      <div v-if="hasMore" class="flex justify-center mt-8">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="border border-green-400 bg-green-100 hover:bg-green-300 disabled:opacity-50 rounded-lg p-2 px-6"
        >
          {{ loadingMore ? 'Chargement...' : 'Charger plus' }}
        </button>
      </div>

      <!-- Message quand tout est chargé -->
      <div v-if="!hasMore && recipes.length > 0" class="text-center mt-8 text-gray-500">
        Toutes les recettes ont été chargées ({{ totalRecipes }} au total)
      </div>
    </AsyncState>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import RecipeCard from '../../components/RecipeCard.vue'
import AsyncState from '~/components/AsyncState.vue'
import RecipeService from '~/services/api/recipeApi'

const recipes = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const totalRecipes = ref(0)
const limit = 9
let searchTimeout = null

const fetchRecipes = async (page = 1) => {
  if (page === 1) {
    loading.value = true
  } else {
    loadingMore.value = true
  }
  error.value = null

  try {
    const data = await RecipeService.getAll(page, limit, searchQuery.value)
    
    if (page === 1) {
      recipes.value = data.data
    } else {
      recipes.value.push(...data.data)
    }
    
    totalRecipes.value = data.total
    currentPage.value = page
  } catch (err) {
    error.value = err.message
  } finally {
    if (page === 1) {
      loading.value = false
    } else {
      loadingMore.value = false
    }
  }
}

const hasMore = computed(() => {
  return recipes.value.length < totalRecipes.value
})

const filteredRecipes = computed(() => {
  return recipes.value
})

const loadMore = () => {
  fetchRecipes(currentPage.value + 1)
}

// Recherche avec debounce
watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchRecipes(1)
  }, 500)
})

onMounted(() => {
  fetchRecipes(1)
})

useHead(() => ({
  title: 'Liste des recettes'
}))
</script>
