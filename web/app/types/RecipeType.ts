import type { RecipeIngredientType } from "./RecipeIngredientType"

export interface RecipeType {
    id: number
    name: string
    description: string
    ingredients: RecipeIngredientType[]
    createdAt: string
    updatedAt: string
}

export interface CreateRecipeDTO {
    name: string
    description: string
}

export interface UpdateRecipeDTO {
    name?: string
    description?: string
}