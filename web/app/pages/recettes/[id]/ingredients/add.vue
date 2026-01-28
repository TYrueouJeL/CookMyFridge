<template>
    <div class="p-6 mx-80">
        <h1 class="text-3xl font-bold mb-4 text-center">Ajout d'un ingrédient</h1>

        <AsyncState :loading="loading" :error="error">
            <form
                @submit.prevent="submit"
                class='border rounded-lg border-gray-300 p-6 space-y-6 mx-80'
            >
                <div>
                    <label class="block font-semibold mb-1">Ingrédient</label>
                    <select
                        v-model="form.ingredientId"
                        class="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        <option value="" disabled>Sélectionnez un ingrédient</option>
                        <option v-for="ingredient in availableIngredients" :key="ingredient.id" :value="ingredient.id">
                            {{ ingredient.name }}
                        </option>
                    </select>
                    <p v-if="errors.ingredientId" class="text-red-500 text-sm mt-1">
                        {{ errors.ingredientId }}
                    </p>
                </div>

                <div>
                    <label class="block font-semibold mb-1">Quantité</label>
                    <input
                        v-model.number="form.quantity"
                        type="number"
                        step="0.01"
                        class="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300"
                        placeholder="100"
                    />
                    <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">
                        {{ errors.quantity }}
                    </p>
                </div>

                <div>
                    <label class="block font-semibold mb-1">Unité</label>
                    <select
                        v-model="form.unit"
                        class="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        <option value="" disabled>Sélectionnez une unité</option>
                        <option v-for="(value, key) in UnitEnum" :key="key" :value="value">
                            {{ value }}
                        </option>
                    </select>
                    <p v-if="errors.unit" class="text-red-500 text-sm mt-1">
                        {{ errors.unit }}
                    </p>
                </div>

                <div class="flex justify-end gap-4">
                    <RouterLink
                        :to="`/recettes/${route.params.id}`"
                        class="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                    >
                        Annuler
                    </RouterLink>
                    <button
                        type="submit"
                        :disabled="loading"
                        class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </AsyncState>
    </div>
</template>

<script setup lang="ts">
import { UnitEnum } from '~/enum/UnitEnum'
import IngredientService from '~/services/api/ingredientApi'
import RecipeService from '~/services/api/recipeApi'
import AuthService from '~/services/api/authApi'
import type { IngredientType } from '~/types/IngredientType'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const error = ref<string | null>(null)
const ingredients = ref<IngredientType[]>([])
const recipeIngredients = ref<any[]>([])

const form = reactive({
    ingredientId: '',
    quantity: 0,
    unit: ''
})

const errors = reactive<{
    ingredientId?: string
    quantity?: string
    unit?: string
}>({})

// Filtrer les ingrédients pour exclure ceux déjà dans la recette
const availableIngredients = computed(() => {
    const recipeIngredientIds = recipeIngredients.value.map(ri => ri.id)
    return ingredients.value.filter(ingredient => !recipeIngredientIds.includes(ingredient.id))
})

onMounted(async () => {
    try {
        const [allIngredients, currentRecipeIngredients, recipe, currentUser] = await Promise.all([
            IngredientService.getAll(),
            RecipeService.getIngredients(Number(route.params.id)),
            RecipeService.getById(Number(route.params.id)),
            AuthService.getMe().then(data => data.user)
        ])
        
        // Vérifier que l'utilisateur est bien le propriétaire de la recette
        if (recipe.userId !== currentUser.id) {
            error.value = 'Vous n\'êtes pas autorisé à modifier cette recette'
            setTimeout(() => {
                router.push(`/recettes/${route.params.id}`)
            }, 2000)
            return
        }
        
        ingredients.value = allIngredients
        recipeIngredients.value = currentRecipeIngredients
    } catch (e: any) {
        error.value = e.message ?? 'Erreur lors du chargement des ingrédients'
    }
})

const validate = () => {
    errors.ingredientId = undefined
    errors.quantity = undefined
    errors.unit = undefined

    if (!form.ingredientId) {
        errors.ingredientId = 'Vous devez sélectionner un ingrédient'
    }

    if (!form.quantity || form.quantity <= 0) {
        errors.quantity = 'La quantité doit être supérieure à 0'
    }

    if (!form.unit) {
        errors.unit = 'Vous devez sélectionner une unité'
    }

    return !errors.ingredientId && !errors.quantity && !errors.unit
}

const submit = async () => {
    if (!validate()) return

    loading.value = true
    error.value = null

    try {
        await RecipeService.addIngredient(Number(route.params.id), {
            ingredientId: Number(form.ingredientId),
            quantity: form.quantity,
            unit: form.unit as UnitEnum
        })
        
        await router.push(`/recettes/${route.params.id}`)
    } catch (e: any) {
        error.value = e.message ?? 'Erreur lors de l\'ajout de l\'ingrédient'
    } finally {
        loading.value = false
    }
}

useHead(() => ({
    title: 'Ajouter un ingrédient'
}))
</script>