export default defineNuxtRouteMiddleware((to) => {
    // Laisse passer les pages publiques (login/register)
    const publicPaths = ['/auth/login', '/auth/register']
    if (publicPaths.includes(to.path)) {
        return
    }

    const { token } = useAuth()

    // Sur le client, si pas de token, on redirige vers la connexion
    if (process.client && !token.value) {
        return navigateTo('/auth/login')
    }
})
