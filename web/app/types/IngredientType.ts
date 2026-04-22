export interface IngredientType {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface CreateIngredientDTO {
    name: string
}

export interface UpdateIngredientDTO {
    name?: string
}