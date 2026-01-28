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
            <div class="m-1">
              <button
              v-if="user?.id === recipe.userId"
              @click="showDeleteModal = true"
              class="border border-red-400 hover:bg-red-200 rounded-lg px-3 py-2 flex items-center justify-center text-center h-min w-full"
              >
                Supprimer la recette
              </button>
            </div>

            <div class="border border-gray-400 rounded-lg m-1 mt-2 px-3 py-2 h-min">
              <p class="font-semibold">Auteur : {{ recipe.user.fullName }}</p>
              <p class="text-sm text-gray-600">Créée {{ formatRelativeTime(recipe.createdAt) }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(recipe.createdAt) }}</p>
              <p v-if="recipe.updatedAt !== recipe.createdAt" class="text-xs text-gray-500">
                Modifiée {{ formatRelativeTime(recipe.updatedAt) }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 border rounded-lg border-green-300 p-2 col-span-2 m-1 h-min auto-rows-fr">
            <p class="text-lg font-bold col-span-3">Ingrédients</p>
            <div class="border rounded-lg border-green-300 p-2 flex flex-col justify-center" v-for="ingredient in recipe.ingredients">
              <p>{{ ingredient.name }}</p>
              <p>Quantitée : {{ ingredient.quantity }}{{ ingredient.unit }}</p>
            </div>

            <RouterLink
            v-if="user?.id === recipe.userId"
            :to="`/recettes/${recipe.id}/ingredients/add`"
            class="border rounded-lg border-green-300 hover:bg-green-200 p-2 flex flex-col justify-center"
            >
              Ajouter un ingredient
            </RouterLink>
          </div>
        </div>
      </div>
    </AsyncState>

    <!-- Modal de confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md">
        <h3 class="text-xl font-bold mb-4">Confirmer la suppression</h3>
        <p class="mb-6">Êtes-vous sûr de vouloir supprimer la recette "{{ recipe?.name }}" ?</p>
        <div class="flex gap-4 justify-end">
          <button 
            @click="showDeleteModal = false"
            class="border border-gray-400 hover:bg-gray-200 rounded-lg px-4 py-2"
          >
            Annuler
          </button>
          <button 
            @click="confirmDelete"
            class="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import RecipeService from '~/services/api/recipeApi'
import AuthService from '~/services/api/authApi'
import { useAuth } from '../../../composables/useAuth';
import { useDate } from '../../../composables/useDate';

const { isAuthenticated } = useAuth()
const { formatDate, formatRelativeTime } = useDate()
const showDeleteModal = ref(false)

const route = useRoute()
const router = useRouter()

// Charger les deux données en parallèle
const { data: pageData, pending: loading, error } = await useAsyncData(
  `recipe-${route.params.id}`,
  async () => {
    const [recipeData, userData] = await Promise.all([
      RecipeService.getById(Number(route.params.id)),
      isAuthenticated.value
        ? AuthService.getMe().then(data => data.user).catch(() => null)
        : Promise.resolve(null)
    ])
    
    return {
      recipe: recipeData,
      user: userData
    }
  }
)

const recipe = computed(() => pageData.value?.recipe)
const user = computed(() => pageData.value?.user)

const confirmDelete = async () => {
  try {
    await RecipeService.delete(Number(route.params.id))
    showDeleteModal.value = false
    router.push('/recettes')
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert(`Erreur lors de la suppression de la recette: ${error.message}`)
    showDeleteModal.value = false
  }
}

useHead(() => ({
  title: recipe.value
    ? `${recipe.value.name} - Détails de la recette`
    : 'Détails de la recette'
}))
</script>