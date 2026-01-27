import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { CreateUserDTO } from '../dto/userDTO.js'
import { createUserValidator } from '#validators/userValidators'
import UserService from '#services/userService'

export default class AuthController {
    private userService = new UserService()

    async register({ request, response }: HttpContext) {
        const payload: CreateUserDTO = await request.validateUsing(createUserValidator)

        const user = await this.userService.create(payload)

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