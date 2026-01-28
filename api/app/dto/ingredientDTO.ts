export interface CreateIngredientDTO {
    name: string
}

export interface UpdateIngredientDTO {
    name?: string
}

export interface ingredientDTO {
    id: number
    name: string
    createdAt: string | null
    updatedAt: string | null
}