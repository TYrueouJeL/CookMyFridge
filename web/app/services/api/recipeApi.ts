import { useApiClient } from "~/composables/useApiClient";
import type { CreateRecipeIngredientDTO, UpdateRecipeIngredientDTO, RecipeIngredientType } from "~/types/RecipeIngredientType";
import type { CreateRecipeDTO, UpdateRecipeDTO, RecipeType } from "~/types/RecipeType";

interface PaginatedRecipes {
  data: RecipeType[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
  }
}

interface CountResult {
  count: number
}

export default class RecipeService {
  static async getAll(page: number = 1, limit: number = 10, search: string = '') {
    const api = useApiClient()
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {})
    })
    return api<PaginatedRecipes>(`recipes?${params}`)
  }

  static async count() {
    const api = useApiClient()
    return api<CountResult>('recipes/count')
  }

  static async getById(id: number) {
    const api = useApiClient()
    return api<RecipeType>(`recipes/${id}`)
  }

  static async create(data: CreateRecipeDTO) {
    const api = useApiClient()
    return api<RecipeType>('recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async update(id: number, data: UpdateRecipeDTO) {
    const api = useApiClient()
    return api<RecipeType>(`recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async delete(id: number) {
    const api = useApiClient()
    return api<null>(`recipes/${id}`, { method: 'DELETE' }).catch((err) => {
      if (err?.response?.status === 204) return null
      throw err
    })
  }

  static async getIngredients(recipeId: number) {
    const api = useApiClient()
    return api<RecipeIngredientType[]>(`recipes/${recipeId}/ingredients`)
  }

  static async getIngredient(recipeId: number, ingredientId: number) {
    const api = useApiClient()
    return api<RecipeIngredientType>(`recipes/${recipeId}/ingredients/${ingredientId}`)
  }

  static async addIngredient(recipeId: number, data: CreateRecipeIngredientDTO) {
    const api = useApiClient()
    return api<RecipeIngredientType>(`recipes/${recipeId}/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async updateIngredient(recipeId: number, ingredientId: number, data: UpdateRecipeIngredientDTO) {
    const api = useApiClient()
    return api<RecipeIngredientType>(`recipes/${recipeId}/ingredients/${ingredientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async removeIngredient(recipeId: number, ingredientId: number) {
    const api = useApiClient()
    return api<null>(`recipes/${recipeId}/ingredients/${ingredientId}`, {
      method: 'DELETE',
    })
  }
}