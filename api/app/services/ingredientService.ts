import Ingredient from "#models/ingredient";
import { CreateIngredientDTO, UpdateIngredientDTO } from "../dto/ingredientDTO.js";

export default class IngredientService {
    public async list() {
        const ingredients = await Ingredient.query()

        return ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
        }))
    }

    public async findById(id: number) {
        const ingredient = await Ingredient
            .query()
            .where('id', id)
            .preload('ingredients', (query) => {
                query.pivotColumns(['quantity', 'unit'])
            })
            .firstOrFail()
        
        return {
            id: ingredient.id,
            name: ingredient.name,
        }
    }

    public async create (data: CreateIngredientDTO) {
        return Ingredient.create(data)
    }

    public async update(
        id: number,
        data: UpdateIngredientDTO
    ) {
        const ingredient = await Ingredient.findOrFail(id)
        ingredient.merge(data)
        await ingredient.save()
        return ingredient
    }

    public async delete(id: number) {
        const ingredient = await Ingredient.findOrFail(id)

        if (!ingredient) return false

        await ingredient.delete()
        return true
    }
}