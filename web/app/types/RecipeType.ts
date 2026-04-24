import type { RecipeIngredientType } from "./RecipeIngredientType"
import type { RecipeStepType } from "./RecipeStepType"

export interface RecipeType {
    id: number
    userId: number
    name: string
    description: string
    ingredients: RecipeIngredientType[]
    steps?: RecipeStepType[]
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