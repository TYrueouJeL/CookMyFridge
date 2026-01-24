import vine from "@vinejs/vine";

export const createIngredientValidator = vine.compile(
    vine.object({
        name: vine
            .string()
    })
)

export const updateIngredientValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .optional()
    })
)