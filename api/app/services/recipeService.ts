import Recipe from "#models/recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../dto/recipeDTO.js";
import { UnitEnum } from "../enums/unitEnum.js";

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

    public async addIngredient(recipeId: number, ingredientId: number, quantity: number, unit: UnitEnum) {
        const recipe = await Recipe.findOrFail(recipeId)

        await recipe.related('ingredients').attach({
            [ingredientId]: { quantity, unit }
        })
    }

    public async updateIngredient(recipeId: number, ingredientId: number, quantity: number, unit: UnitEnum) {
        const recipe = await Recipe.findOrFail(recipeId)

        await recipe.related('ingredients').sync({
            [ingredientId]: { quantity, unit }
        })
    }

    public async removeIngredient(recipeId: number, ingredientId: number) {
        const recipe = await Recipe.findOrFail(recipeId)

        await recipe.related('ingredients').detach([ingredientId])
    }

    public async listIngredients(recipeId: number) {
        const recipe = await Recipe.query().where('id', recipeId).preload('ingredients').firstOrFail()

        return recipe.ingredients
    }
}