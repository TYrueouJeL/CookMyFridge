import Recipe from "#models/recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../dto/recipeDTO.js";
import { CreateRecipeIngredientDTO, RecipeIngredientDTO, UpdateRecipeIngredientDTO } from "../dto/recipeIngredientDTO.js";

export default class RecipeService {
    public async list() {
        const recipes = await Recipe.query()

        return recipes.map((recipe) => ({
            id: recipe.id,
            name: recipe.name
        }))
    }

    public async findById(id: number) {
        const recipe = await Recipe
            .query()
            .where('id', id)
            .preload('ingredients', (query) => {
                query.pivotColumns(['quantity', 'unit'])
            })
            .firstOrFail()
        
        return {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients.map((ingredient) => ({
                id: ingredient.id,
                name: ingredient.name,
                quantity: ingredient.$extras.pivot_quantity,
                unit: ingredient.$extras.pivot_unit
            }))
        }
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

        if (!recipe) return false

        await recipe.delete()
        return true
    }

    public async addIngredient(recipeId: number, data: CreateRecipeIngredientDTO) {
        const recipe = await Recipe.findOrFail(recipeId)

        await recipe.related('ingredients').attach({
            [data.ingredientId]: {
                quantity: data.quantity,
                unit: data.unit
            }
        })
    }

    public async updateIngredient(recipeId: number, ingredientId: number, data: UpdateRecipeIngredientDTO) {
        const recipe = await Recipe.findOrFail(recipeId)

        const affectedRows = await recipe
            .related('ingredients')
            .pivotQuery()
            .where('ingredients.id', ingredientId)
            .update({
                quantiy: data.quantity,
                unit: data.unit
            })
        
        if (affectedRows.length === 0) return null

        const ingredient = await recipe.related('ingredients').query().where('ingredients.id', ingredientId).first()
        return ingredient
    }

    public async removeIngredient(recipeId: number, ingredientId: number) {
        const recipe = await Recipe.findOrFail(recipeId)

        const ingredient = await recipe
            .related('ingredients')
            .query()
            .where('ingredients.id', ingredientId)
            .first()

        if (!ingredient) return false

        await recipe.related('ingredients').detach([ingredientId])
        return true
    }

    public async indexIngredients(recipeId: number) {
        const recipe = await Recipe.query()
            .where('id', recipeId)
            .preload('ingredients', (query) => query.pivotColumns(['quantity', 'unit']))
            .firstOrFail()
        
        const ingredients: RecipeIngredientDTO[] = recipe.ingredients.map((ingredient) => ({
            id: ingredient.id,
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ingredient.$extras.quantity,
            unit: ingredient.$extras.unit
        }))

        return ingredients
    }
    
    public async showRecipeIngredient(recipeId: number, ingredientId: number) {
        const recipe = await Recipe.query().where('id', recipeId).preload('ingredients', (query) => {
            query.where('ingredients.id', ingredientId)
        })
        .firstOrFail()

        const ingredient = recipe.ingredients[0]

        if (!ingredient) {
            throw new Error('Ingredient not found in this recipe')
        }

        return {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.$extras.quantity,
            unit: ingredient.$extras.unit,
        }
    }
}