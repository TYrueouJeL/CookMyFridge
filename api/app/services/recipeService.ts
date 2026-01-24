import Recipe from "#models/recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../dto/recipeDTO.js";

export default class RecipeService {
    public async list() {
        return Recipe.all()
    }

    public async findById(id: number) {
        return Recipe.findOrFail(id)
    }

    public async create(data: CreateRecipeDTO) {
        return Recipe.create(data)
    }

    public async update(
        id: number,
        data: UpdateRecipeDTO
    ) {
        const recipe = await Recipe.findOrFail(id)
        recipe.merge(data)
        await recipe.save()
        return recipe
    }

    public async delete(id: number) {
        const recipe = await Recipe.findOrFail(id)
        await recipe.delete()
    }
}