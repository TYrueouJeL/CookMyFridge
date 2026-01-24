import { UnitEnum } from "../enums/unitEnum.js"

export interface CreateRecipeIngredientDTO {
    quantity: number
    unit: UnitEnum
}

export interface UpdateRecipeIngredientDTO {
    quantity?: number
    unit?: UnitEnum
}