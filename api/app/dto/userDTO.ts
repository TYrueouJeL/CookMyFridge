export interface UserDTO {
    id: number
    fullName: string | null
    email: string
    password: string
}

export interface CreateUserDTO {
    fullName: string | null
    email: string
    password: string
}

export interface UpdateUserDTO {
    fullName?: string | null
    email: string
    password: string
}