import Recipe from "#models/recipe";
import { faker } from '@faker-js/faker'
import { RecipeStepSeederFactory } from './recipeStepSeederFactory.js'

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
            const recipe = await this.create({ userId })
            // Add 2-5 steps to each recipe
            const stepsCount = Math.floor(Math.random() * 4) + 2
            await RecipeStepSeederFactory.createMany(stepsCount, recipe.id)
            recipes.push(recipe)
        }
        return recipes
    }
}
