import User from "#models/user"
import { faker } from "@faker-js/faker"

type UserType = {
    fullName?: string | null
    email?: string
    password?: string
}

export class UserSeederFactory {
    static async create(data: UserType = {}) {
        return User.create({
            fullName: data.fullName || faker.person.fullName(),
            email: data.email || faker.internet.email(),
            password: data.password || faker.internet.password()
        })
    }

    static async createMany(count: number) {
        const users = []
        for (let i = 0; i < count; i++) {
            users.push(await this.create())
        }
        return users
    }
}