import vine from "@vinejs/vine"

export const createRecipeValidator = vine.compile(
    vine.object({
        name: vine
            .string(),

        description: vine
            .string(),
    })
)

export const updateRecipeValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .optional(),

        description: vine
            .string()
            .optional()
    })
)