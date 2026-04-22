import Recipe from "#models/recipe";
import { faker } from '@faker-js/faker'

type RecipeType = {
    name?: string
    description?: string
    userId?: number
}

export class RecipeSeederFactory {
    static async create(data: RecipeType = {}) {
        return Recipe.create({
            name: data.name || faker.food.dish(),
            description: data.description || faker.food.description(),
            userId: data.userId || 1,
        })
    }

    static async createMany(count: number, userId?: number) {
        const recipes = []
        for (let i = 0; i < count; i++) {
            recipes.push(await this.create({ userId }))
        }
        return recipes
    }
}