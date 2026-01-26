import type { CreateRecipeDTO } from "~/types/RecipeType";
const apiUrl = import.meta.env.VITE_API_URL

export default class RecipeService {
    static async create(data: CreateRecipeDTO) {
        const response = await fetch(`${apiUrl}recipes`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    
        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }
    
        return response.json()
    }
}
