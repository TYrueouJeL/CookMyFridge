import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    async register({ request, response }: HttpContext) {
        const data = request.only(['email', 'password'])

        const user = await User.create({
            email: data.email,
            password: data.password
        })

        const token = await User.accessTokens.create(user)

        return response.created({
            user,
            token: token.value!.release(),
        })
    }

    async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        const user = await User.verifyCredentials(email, password)

        const token = await User.accessTokens.create(user)

        return response.ok({
            user,
            token: token.value!.release()
        })
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('api').invalidateToken()

        return response.ok({
            message: 'Déconnecté'
        })
    }
}