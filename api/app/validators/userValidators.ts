import vine from "@vinejs/vine";

export const createUserValidator = vine.compile(
    vine.object({
        email: vine
            .string()
            .email(),

        password: vine
            .string()
            .minLength(8)
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        
        fullName: vine
            .string()
    })
)

export const updateUserValidator = vine.compile(
    vine.object({
        email: vine
            .string()
            .email()
            .optional(),

        password: vine
            .string()
            .minLength(8)
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .optional(),
        
        fullName: vine
            .string()
            .optional()
    })
)