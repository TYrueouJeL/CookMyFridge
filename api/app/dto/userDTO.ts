import Recipe from "#models/recipe"

export interface UserDTO {
    id: number
    fullName: string | null
    email: string
    password: string
    recipes: Recipe[]
    createdAt: string
    updatedAt: string
}

export interface CreateUserDTO {
    fullName: string
    email: string
    password: string
}

export interface UpdateUserDTO {
    fullName?: string | null
    email: string
    password: string
}