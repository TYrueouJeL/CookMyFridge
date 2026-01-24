import Recipe from "#models/recipe";
import { faker } from '@faker-js/faker'

type RecipeType = {
    name?: string
}

export class RecipeSeederFactory {
    static async create(data: RecipeType = {}) {
        return Recipe.create({
            name: data.name || faker.food.dish()
        })
    }

    static async createMany(count: number) {
        const recipes = []
        for (let i = 0; i < count; i++) {
            recipes.push(await this.create())
        }
        return recipes
    }
}