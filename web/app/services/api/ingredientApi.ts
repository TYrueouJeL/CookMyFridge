import type { CreateIngredientDTO, UpdateIngredientDTO } from "~/types/IngredientType"

const apiUrl = import.meta.env.VITE_API_URL

export default class IngredientService {
    static async getAll() {
        const response = await fetch(`${apiUrl}ingredients`, {
            method: 'GET',
            credentials: 'include',
        })

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }

        return response.json()
    }

    static async getById(ingredientId: number) {
        const response = await fetch(`${apiUrl}ingredients/${ingredientId}`, {
            method: 'GET',
            credentials: 'include',
        })

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }

        return response.json()
    }

    static async create(data: CreateIngredientDTO) {
        const response = await fetch(`${apiUrl}ingredients`, {
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

    static async update(ingredientId: number, data: UpdateIngredientDTO) {
        const response = await fetch(`${apiUrl}ingredients/${ingredientId}`, {
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

    static async delete(ingredientId: number) {
        const response = await fetch(`${apiUrl}ingredients/${ingredientId}`, {
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