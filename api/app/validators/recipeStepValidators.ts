import vine from "@vinejs/vine"

export const createRecipeStepValidator = vine.compile(
    vine.object({
        stepNumber: vine
            .number()
            .positive(),

        description: vine
            .string()
            .minLength(1),

        durationMinutes: vine
            .number()
            .positive()
            .optional()
    })
)

export const updateRecipeStepValidator = vine.compile(
    vine.object({
        stepNumber: vine
            .number()
            .positive()
            .optional(),

        description: vine
            .string()
            .minLength(1)
            .optional(),

        durationMinutes: vine
            .number()
            .positive()
            .optional()
    })
)
