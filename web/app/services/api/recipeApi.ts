import type { CreateRecipeDTO } from "~/types/RecipeType";
const apiUrl = import.meta.env.VITE_API_URL

export default class RecipeService {
    static async getAll() {
        const response = await fetch(`${apiUrl}recipes`, {
            method: 'GET',
            credentials: 'include',
        })
    
        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }
    
        return response.json()
    }

    static async getById(id: number) {
        const response = await fetch(`${apiUrl}recipes/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
    
        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }
    
        return response.json()
    }

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

    static async update(id: number, data: CreateRecipeDTO) {
        const response = await fetch(`${apiUrl}recipes/${id}`, {
            method: 'PUT',
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

    static async delete(id: number) {
        const response = await fetch(`${apiUrl}recipes/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
    
        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }
    
        return response.json()
    }
}
