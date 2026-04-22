import Recipe from "#models/recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../dto/recipeDTO.js";
import { CreateRecipeIngredientDTO, RecipeIngredientDTO, UpdateRecipeIngredientDTO } from "../dto/recipeIngredientDTO.js";

export default class RecipeService {
    public async list() {
        const recipes = await Recipe.query().preload('user')

        return recipes.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            user: {
                id: recipe.user.id,
                fullName: recipe.user.fullName,
                email: recipe.user.email
            },
            createdAt: recipe.createdAt.toISO(),
            updatedAt: recipe.updatedAt.toISO()
        }))
    }

    public async findById(id: number) {
        const recipe = await Recipe
            .query()
            .where('id', id)
            .preload('ingredients', (query) => {
                query.pivotColumns(['quantity', 'unit'])
            })
            .preload('user')
            .firstOrFail()
        
        return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            user: {
                id: recipe.user.id,
                fullName: recipe.user.fullName,
                email: recipe.user.email
            },
            ingredients: recipe.ingredients.map((ingredient) => ({
                id: ingredient.id,
                name: ingredient.name,
                quantity: ingredient.$extras.pivot_quantity,
                unit: ingredient.$extras.pivot_unit
            })),
            createdAt: recipe.createdAt.toISO(),
            updatedAt: recipe.updatedAt.toISO()
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

    public async indexIngredients(recipeId: number) {
        const recipe = await Recipe.query()
            .where('id', recipeId)
            .preload('ingredients', (query) => query.pivotColumns(['quantity', 'unit', 'created_at', 'updated_at']))
            .firstOrFail()
        
        const ingredients: RecipeIngredientDTO[] = recipe.ingredients.map((ingredient) => ({
            id: ingredient.id,
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ingredient.$extras.pivot_quantity,
            unit: ingredient.$extras.pivot_unit,
            createdAt: ingredient.$extras.pivot_created_at,
            updatedAt: ingredient.$extras.pivot_updated_at
        }))

        return ingredients
    }
    
    public async showIngredient(recipeId: number, ingredientId: number) {
        const recipe = await Recipe.query().where('id', recipeId).preload('ingredients', (query) => {
            query.where('ingredients.id', ingredientId).pivotColumns(['quantity', 'unit', 'created_at', 'updated_at'])
        })
        .firstOrFail()

        const ingredient = recipe.ingredients[0]

        if (!ingredient) {
            throw new Error('Ingredient not found in this recipe')
        }

        return {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.$extras.pivot_quantity,
            unit: ingredient.$extras.pivot_unit,
            createdAt: ingredient.$extras.pivot_created_at,
            updatedAt: ingredient.$extras.pivot_updated_at
        }
    }

    public async addIngredient(recipeId: number, data: CreateRecipeIngredientDTO) {
        const recipe = await Recipe.findOrFail(recipeId)

        await recipe.related('ingredients').attach({
            [data.ingredientId]: {
                quantity: data.quantity,
                unit: data.unit
            }
        })

        const ingredient = await recipe
            .related('ingredients')
            .query()
            .where('ingredients.id', data.ingredientId)
            .pivotColumns(['quantity', 'unit', 'created_at', 'updated_at'])
            .firstOrFail()

        return {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.$extras.pivot_quantity,
            unit: ingredient.$extras.pivot_unit,
            createdAt: ingredient.$extras.pivot_created_at,
            updatedAt: ingredient.$extras.pivot_updated_at
        }
    }

    public async updateIngredient(recipeId: number, ingredientId: number, data: UpdateRecipeIngredientDTO) {
        const recipe = await Recipe.findOrFail(recipeId)

        const affectedRows = await recipe
            .related('ingredients')
            .pivotQuery()
            .where('ingredient_id', ingredientId)
            .update({
                quantity: data.quantity,
                unit: data.unit
            })
        
        if (affectedRows.length === 0) return null

        const ingredient = await recipe
            .related('ingredients')
            .query()
            .where('ingredients.id', ingredientId)
            .pivotColumns(['quantity', 'unit', 'created_at', 'updated_at'])
            .firstOrFail()
        
        return {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.$extras.pivot_quantity,
            unit: ingredient.$extras.pivot_unit,
            createdAt: ingredient.$extras.pivot_created_at,
            updatedAt: ingredient.$extras.pivot_updated_at
        }
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
}