import { computed, readonly, onMounted } from 'vue'

export const useAuth = () => {
    const token = useState<string | null>('auth.token', () => {
        // Récupérer le token du localStorage au démarrage (côté client uniquement)
        if (typeof window !== 'undefined') {
            return localStorage.getItem('authToken')
        }
        return null
    })

    // S'assurer que le token est chargé au démarrage côté client
    if (typeof window !== 'undefined') {
        onMounted(() => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken && token.value !== storedToken) {
                token.value = storedToken
            }
        })
    }

    const setToken = (newToken: string) => {
        token.value = newToken
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', newToken)
        }
    }

    const clearToken = () => {
        token.value = null
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken')
        }
    }

    const isAuthenticated = computed(() => !!token.value)

    return {
        token: readonly(token),
        setToken,
        clearToken,
        isAuthenticated
    }
}
