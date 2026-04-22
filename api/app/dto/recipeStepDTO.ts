export interface CreateRecipeStepDTO {
    recipeId: number
    stepNumber: number
    description: string
    durationMinutes?: number | null
}

export interface UpdateRecipeStepDTO {
    stepNumber?: number
    description?: string
    durationMinutes?: number | null
}

export interface RecipeStepDTO {
    id: number
    recipeId: number
    stepNumber: number
    description: string
    durationMinutes: number | null
    createdAt: string | null
    updatedAt: string | null
}
