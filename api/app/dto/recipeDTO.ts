export interface CreateRecipeDTO {
    name: string
    description: string
}

export interface UpdateRecipeDTO {
    name?: string
    description?: string
}

export interface RecipeParams {
    recipeId: number
}

export interface RecipeDTO {
    id: number
    name: string
    description: string
}