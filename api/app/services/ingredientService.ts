import Ingredient from "#models/ingredient";
import { CreateIngredientDTO, UpdateIngredientDTO } from "../dto/ingredientDTO.js";

export default class IngredientService {
    public async list() {
        return Ingredient.all()
    }

    public async findById(id: number) {
        return Ingredient.findOrFail(id)
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
        ingredient.save()
        return ingredient
    }

    public async delete(id: number) {
        const ingredient = await Ingredient.findOrFail(id)
        await ingredient.delete()
    }
}