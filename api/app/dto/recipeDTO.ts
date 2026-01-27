export interface CreateRecipeDTO {
    name: string
    description: string
    userId: number
}

export interface UpdateRecipeDTO {
    name?: string
    description?: string
}

export interface RecipeParams {
    recipeId: number
    userId: number
}

export interface RecipeDTO {
    id: number
    name: string
    description: string
    userId?: number
    user?: {
        id: number
        fullName: string
        email: string
    }
    ingredients?: Array<{
        id: number
        name: string
        quantity: any
        unit: any
    }>
}