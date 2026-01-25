export interface CreateRecipeDTO {
    name: string
}

export interface UpdateRecipeDTO {
    name?: string
}

export interface RecipeParams {
    recipeId: number
}

export interface RecipeDTO {
    id: number
    name: string
}