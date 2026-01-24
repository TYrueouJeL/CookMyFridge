import Ingredient from "#models/ingredient"
import { faker } from "@faker-js/faker"

type IngredientType = {
    name?: string
}

export class IngredientSeederFactory {
    static async create(data: IngredientType = {}) {
        return Ingredient.create({
            name: data.name ||faker.food.ingredient()
        })
    }

    static async createMany(count: number) {
        const ingredients = []
        for (let i = 0; i < count; i++) {
            ingredients.push(await this.create())
        }
        return ingredients
    }
}