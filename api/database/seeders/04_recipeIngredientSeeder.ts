import Ingredient from "#models/ingredient";
import Recipe from "#models/recipe";
import db from "@adonisjs/lucid/services/db";
import { UnitEnum } from "../../app/enums/unitEnum.js";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
    const values = Object.values(enumObj)
    return values[Math.floor(Math.random() * values.length)]
}


export default class RecipeIngredientSeeder extends BaseSeeder {
    public async run() {
        await db.from('recipe_ingredient').delete()

        const recipes = await Recipe.all()
        const ingredients = await Ingredient.all()

        if (recipes.length === 0 || ingredients.length === 0){
            console.warn('Aucune recette ou ingrédient trouvé pour le seeding')
            return
        }

        for (const recipe of recipes) {
            const pivotData: Record<number, { quantity: number; unit: UnitEnum }> = {}

            const selectedIngredients = ingredients
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 3) + 2)
            
            for (const ingredient of selectedIngredients) {
                pivotData[ingredient.id] = {
                    quantity: Math.floor(Math.random() * 500) + 1,
                    unit: randomEnumValue(UnitEnum),
                }
            }

            await recipe.related('ingredients').sync(pivotData)
        }
    }
}