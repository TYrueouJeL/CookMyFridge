<template>
  <div class="min-h-screen bg-linear-to-b from-white via-green-100 to-white">
    <!-- Hero Section -->
    <section class="container mx-auto px-6 pt-16 pb-24 text-center">
      <div class="max-w-4xl mx-auto">
        <!-- Badge -->
        <div class="inline-block mb-6" data-aos="fade-down">
          <span class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            🍳 Votre assistant culinaire intelligent
          </span>
        </div>
        
        <!-- Main Title -->
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">
          Ne laissez plus vos 
          <span class="text-green-600 relative inline-block">
            ingrédients
            <svg class="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8 Q50 2, 100 8 T200 8" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
          </span>
          dormir au frigo
        </h1>
        
        <p class="text-xl text-gray-600 mb-10 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          Transformez le contenu de votre réfrigérateur en délicieuses recettes. 
          CookMyFridge vous aide à cuisiner intelligemment et à réduire le gaspillage alimentaire.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="300">
          <NuxtLink
            to="/recettes"
            class="group relative px-8 py-4 bg-green-600 text-white font-semibold rounded-xl
                   shadow-lg hover:shadow-2xl transform hover:-translate-y-1
                   transition-all duration-300 hover:bg-green-700
                   flex items-center gap-2"
          >
            <span>Découvrir les recettes</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink
            v-if="!isAuthenticated"
            to="/auth/login"
            class="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl
                   border-2 border-green-600 hover:bg-green-50
                   shadow-md hover:shadow-lg transform hover:-translate-y-1
                   transition-all duration-300"
          >
            Commencer gratuitement
          </NuxtLink>
        </div>
      </div>
      
      <!-- Hero Image/Illustration -->
      <div class="mt-16 relative" data-aos="zoom-in" data-aos-delay="400">
        <div class="absolute inset-0 bg-linear-to-r from-green-200 to-emerald-200 rounded-3xl blur-3xl opacity-30 transform -rotate-2"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border border-green-100">
          <div class="flex items-center justify-center gap-6 flex-wrap select-none">
            <div class="text-6xl" data-aos="flip-left" data-aos-delay="500">🥗</div>
            <div class="text-6xl" data-aos="flip-left" data-aos-delay="600">🍕</div>
            <div class="text-6xl" data-aos="flip-left" data-aos-delay="700">🍜</div>
            <div class="text-6xl" data-aos="flip-left" data-aos-delay="800">🥘</div>
            <div class="text-6xl" data-aos="flip-left" data-aos-delay="900">🍰</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-6 py-20">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Comment ça fonctionne ?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          CookMyFridge simplifie votre quotidien culinaire en trois étapes simples
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Feature 1 -->
        <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
             data-aos="fade-right" data-aos-delay="100">
          <div class="absolute -top-6 left-8 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            1
          </div>
          <div class="text-5xl mb-6 mt-4">🧊</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">
            Listez vos ingrédients
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Ajoutez simplement les ingrédients disponibles dans votre réfrigérateur ou vos placards
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
             data-aos="fade-up" data-aos-delay="200">
          <div class="absolute -top-6 left-8 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <div class="text-5xl mb-6 mt-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">
            Trouvez des recettes
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Notre algorithme vous propose des recettes adaptées à vos ingrédients disponibles
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
             data-aos="fade-left" data-aos-delay="300">
          <div class="absolute -top-6 left-8 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <div class="text-5xl mb-6 mt-4">👨‍🍳</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">
            Cuisinez facilement
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Suivez les instructions détaillées et régalez-vous avec des plats savoureux
          </p>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="bg-linear-to-r from-green-600 to-emerald-600 py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-4xl font-bold text-white mb-4">
              Pourquoi choisir CookMyFridge ?
            </h2>
            <p class="text-white text-lg">
              Bien plus qu'un simple répertoire de recettes
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20"
                 data-aos="fade-up" data-aos-delay="100">
              <div class="flex items-start gap-4">
                <div class="text-3xl">💰</div>
                <div>
                  <h3 class="text-xl font-bold text-green-500 mb-2">Économisez de l'argent</h3>
                  <p class="text-green-500 text-opacity-90">Utilisez ce que vous avez déjà et réduisez vos courses inutiles</p>
                </div>
              </div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20"
                 data-aos="fade-up" data-aos-delay="200">
              <div class="flex items-start gap-4">
                <div class="text-3xl">🌍</div>
                <div>
                  <h3 class="text-xl font-bold text-green-500 mb-2">Réduisez le gaspillage</h3>
                  <p class="text-green-500 text-opacity-90">Contribuez à la protection de l'environnement en gaspillant moins</p>
                </div>
              </div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20"
                 data-aos="fade-up" data-aos-delay="300">
              <div class="flex items-start gap-4">
                <div class="text-3xl">⏱️</div>
                <div>
                  <h3 class="text-xl font-bold text-green-500 mb-2">Gagnez du temps</h3>
                  <p class="text-green-500 text-opacity-90">Plus besoin de chercher des heures quoi cuisiner</p>
                </div>
              </div>
            </div>

            <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20"
                 data-aos="fade-up" data-aos-delay="400">
              <div class="flex items-start gap-4">
                <div class="text-3xl">🎨</div>
                <div>
                  <h3 class="text-xl font-bold text-green-500 mb-2">Variez les plaisirs</h3>
                  <p class="text-green-500 text-opacity-90">Découvrez de nouvelles recettes et inspirations culinaires</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-6 py-20" data-aos="zoom-in">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-xl border border-green-100">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            Prêt à transformer votre cuisine ?
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Rejoignez CookMyFridge dès aujourd'hui et ne manquez plus jamais d'inspiration culinaire
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              v-if="!isAuthenticated"
              to="/auth/login"
              class="group px-10 py-5 bg-green-600 text-white font-bold text-lg rounded-xl
                     shadow-lg hover:shadow-2xl transform hover:-translate-y-1
                     transition-all duration-300 hover:bg-green-700
                     flex items-center justify-center gap-2"
            >
              <span>Créer un compte gratuitement</span>
              <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink
              to="/recettes"
              class="px-10 py-5 bg-white text-green-600 font-bold text-lg rounded-xl
                     border-2 border-green-600 hover:bg-green-50
                     shadow-md hover:shadow-lg transform hover:-translate-y-1
                     transition-all duration-300"
            >
              Explorer les recettes
            </NuxtLink>
          </div>

          <p class="text-sm text-gray-500 mt-6">
            Gratuit • Sans engagement • Commencez en 30 secondes
          </p>
        </div>
      </div>
    </section>

    <!-- Footer Stats -->
    <section class="container mx-auto px-6 py-12 mb-12">
      <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div data-aos="fade-up" data-aos-delay="100">
          <div class="text-4xl font-bold text-green-600 mb-2">{{ stats.recipes }}</div>
          <div class="text-gray-600">Recettes</div>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <div class="text-4xl font-bold text-green-600 mb-2">{{ stats.ingredients }}</div>
          <div class="text-gray-600">Ingrédients</div>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <div class="text-4xl font-bold text-green-600 mb-2">100%</div>
          <div class="text-gray-600">Gratuit</div>
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <div class="text-4xl font-bold text-green-600 mb-2">♾️</div>
          <div class="text-gray-600">Possibilités</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import RecipeService from '~/services/api/recipeApi'
import IngredientService from '~/services/api/ingredientApi'

const { isAuthenticated } = useAuth()

const stats = ref({
  recipes: 0,
  ingredients: 0
})

// Charger les statistiques
const { pending } = await useAsyncData('stats', async () => {
  try {
    const [recipeData, ingredientData] = await Promise.all([
      RecipeService.count(),
      IngredientService.count()
    ])
    
    stats.value = {
      recipes: recipeData.count,
      ingredients: ingredientData.count
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
})

useHead(() => ({
  title: 'CookMyFridge - Transformez votre frigo en délicieuses recettes',
  meta: [
    {
      name: 'description',
      content: 'Ne gaspillez plus vos ingrédients ! CookMyFridge vous aide à trouver des recettes délicieuses adaptées aux ingrédients de votre frigo.'
    }
  ]
}))
</script>