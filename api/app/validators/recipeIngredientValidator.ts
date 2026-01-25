import vine from "@vinejs/vine";
import { UnitEnum } from "../enums/unitEnum.js";

export const createRecipeIngredientValidator = vine.compile(
    vine.object({
        ingredientId: vine
            .number(),
        
        quantity: vine
            .number(),
        
        unit: vine
            .enum(UnitEnum)
    })
)

export const updateRecipeIngredientValidator = vine.compile(
    vine.object({
        ingredientId: vine
            .number(),
        
        quantity: vine
            .number()
            .optional(),
        
        unit: vine
            .enum(UnitEnum)
            .optional()
    })
)