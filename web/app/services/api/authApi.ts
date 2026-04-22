import type { LoginType, RegisterType } from "~/types/UserType"

const apiUrl = import.meta.env.VITE_API_URL

export default class AuthService {
    static async register(data: RegisterType) {
        const response = await fetch(`${apiUrl}register`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }

        const result = await response.json()
        
        // Stocker le token
        if (result.token) {
            const { setToken } = useAuth()
            setToken(result.token)
        }

        return result
    }

    static async login(data: LoginType) {
        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }

        const result = await response.json()
        
        // Stocker le token
        if (result.token) {
            const { setToken } = useAuth()
            setToken(result.token)
        }

        return result
    }

    static async logout() {
        const response = await fetch(`${apiUrl}logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const { clearToken } = useAuth()
        clearToken()

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur lors de la déconnexion')
        }
    }

    static async getMe() {
        const response = await fetch(`${apiUrl}me`, {
            method: 'GET',
            credentials: 'include'
        })

        if (!response.ok) {
            const body = await response.json()
            throw new Error(body.message ?? 'Erreur API')
        }

        return await response.json()
    }
}