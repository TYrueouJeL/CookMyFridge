import type { UnitEnum } from "~/enum/UnitEnum"

export interface RecipeIngredientType {
    quantity: number
    unit: UnitEnum
    createdAt: string
    updatedAt: string
}

export interface CreateRecipeIngredientDTO {
    ingredientId: number
    quantity: number
    unit: UnitEnum
}

export interface UpdateRecipeIngredientDTO {
    quantity?: number
    unit?: UnitEnum
}