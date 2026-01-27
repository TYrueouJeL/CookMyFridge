export default defineNuxtPlugin(() => {
    const { token } = useAuth()

    // Intercepter les requêtes fetch
    const originalFetch = globalThis.fetch

    globalThis.fetch = async (resource, config: any = {}) => {
        // Ajouter le token aux en-têtes si présent
        if (token.value) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token.value}`
        }

        return originalFetch(resource, config)
    }
})
