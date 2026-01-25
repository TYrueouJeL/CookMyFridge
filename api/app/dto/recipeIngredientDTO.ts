import { UnitEnum } from "../enums/unitEnum.js"

export interface CreateRecipeIngredientDTO {
    ingredientId: number
    quantity: number
    unit: UnitEnum
}

export interface UpdateRecipeIngredientDTO {
    quantity?: number
    unit?: UnitEnum
}

export interface RecipeIngredientParams {
    recipeId: number
    ingredientId: number
}

export interface RecipeIngredientDTO {
    id: number
    recipeId: number
    ingredientId: number
    quantity: number
    unit: UnitEnum
}