<template>
    <div class="p-6 mx-80">
        <h1 class="text-3xl font-bold mb-4 text-center">Création d'une recette</h1>

        <AsyncState :loading="loading" :error="error">
            <form
                @submit.prevent="submit"
                class="border rounded-lg border-gray-300 p-6 space-y-6 mx-80"
            >
                <div>
                    <label class="block font-semibold mb-1">Nom de la recette</label>
    
                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300"
                        placeholder="Pizza Margherita"
                    />
    
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                        {{ errors.name }}
                    </p>
                </div>

                <div>
                    <label class="block font-semibold mb-1">Description de la recette</label>
    
                    <input
                        v-model="form.description"
                        type="text"
                        class="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300"
                        placeholder="Une délicieuse pizza italienne..."
                    />
    
                    <p v-if="errors.description" class="text-red-500 text-sm mt-1">
                        {{ errors.description }}
                    </p>
                </div>

                <div class="flex justify-end gap-4">
                    <button
                        type="submit"
                        :disabled="loading"
                        class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Créer la recette
                    </button>
                </div>
            </form>
        </AsyncState>
    </div>
</template>

<script setup lang="ts">
import RecipeService from '~/services/api/recipeApi'
import type { CreateRecipeDTO } from '~/types/RecipeType'

const router = useRouter()

const loading = ref(false)
const error = ref<string | null>(null)

const form = reactive<CreateRecipeDTO>({
    name: '',
    description: ''
})

const errors = reactive<{
    name?: string
    description?: string
}>({})

const validate = () => {
    errors.name = undefined
    errors.description = undefined

    if (!form.name.trim()) {
        errors.name = 'Le nom est obligatoire'
    }

    if (form.description.trim().length < 5) {
        errors.description = 'La description doit faire au moins 5 caractères'
    }

    return !errors.name && !errors.description
}

const submit = async () => {
    if (!validate()) return

    loading.value = true
    error.value = null

    try {
        const recipe = await RecipeService.create({
            name: form.name,
            description: form.description
        })

        router.push(`/recettes/${recipe.id}`)
    } catch (e: any) {
        error.value = e.message ?? 'Erreur lors de la création'
    } finally {
        loading.value = false
    }
}

useHead(() => ({
    title: 'Création d\'une recette'
}))
</script>