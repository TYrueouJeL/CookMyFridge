import { useApiClient } from "~/composables/useApiClient";
import type { CreateRecipeIngredientDTO, UpdateRecipeIngredientDTO } from "~/types/RecipeIngredientType";
import type { CreateRecipeDTO, UpdateRecipeDTO } from "~/types/RecipeType";

export default class RecipeService {
  static async getAll(page: number = 1, limit: number = 10, search: string = '') {
    const api = useApiClient()
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search ? { search } : {})
    })
    return api(`recipes?${params}`)
  }

  static async count() {
    const api = useApiClient()
    return api('recipes/count')
  }

  static async getById(id: number) {
    const api = useApiClient()
    return api(`recipes/${id}`)
  }

  static async create(data: CreateRecipeDTO) {
    const api = useApiClient()
    return api('recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async update(id: number, data: UpdateRecipeDTO) {
    const api = useApiClient()
    return api(`recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async delete(id: number) {
    const api = useApiClient()
    // $fetch lance une erreur sur 4xx/5xx automatiquement
    // Pour le 204 No Content, $fetch retourne null tout seul
    return api(`recipes/${id}`, { method: 'DELETE' }).catch((err) => {
      if (err?.response?.status === 204) return null
      throw err
    })
  }

  static async getIngredients(recipeId: number) {
    const api = useApiClient()
    return api(`recipes/${recipeId}/ingredients`)
  }

  static async getIngredient(recipeId: number, ingredientId: number) {
    const api = useApiClient()
    return api(`recipes/${recipeId}/ingredients/${ingredientId}`)
  }

  static async addIngredient(recipeId: number, data: CreateRecipeIngredientDTO) {
    const api = useApiClient()
    return api(`recipes/${recipeId}/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async updateIngredient(recipeId: number, ingredientId: number, data: UpdateRecipeIngredientDTO) {
    const api = useApiClient()
    return api(`recipes/${recipeId}/ingredients/${ingredientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  static async removeIngredient(recipeId: number, ingredientId: number) {
    const api = useApiClient()
    return api(`recipes/${recipeId}/ingredients/${ingredientId}`, {
      method: 'DELETE',
    })
  }
}