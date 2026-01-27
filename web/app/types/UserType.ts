export interface UserType {
    id: number
    fullName: string
    email: string
    password: string
}

export interface RegisterType {
    fullName: string
    email: string
    password:string
}

export interface LoginType {
    email: string
    password: string
}

export interface UserUpdateType {
    fullName?: string
    email?: string
    password?: string
}