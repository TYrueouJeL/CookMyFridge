import RecipeService from '#services/recipeService';
import { createRecipeIngredientValidator, updateRecipeIngredientValidator } from '#validators/recipeIngredientValidator';
import { createRecipeValidator, updateRecipeValidator } from '#validators/recipeValidators';
import { HttpContext } from '@adonisjs/core/http';
import { CreateRecipeDTO, RecipeDTO, UpdateRecipeDTO } from '../dto/recipeDTO.js';
import { CreateRecipeIngredientDTO, RecipeIngredientDTO, UpdateRecipeIngredientDTO } from '../dto/recipeIngredientDTO.js';

export default class RecipeController {
    private recipeService = new RecipeService()

    public async index({ response }: HttpContext) {
        const recipes: RecipeDTO[] = await this.recipeService.list()
        return response.ok(recipes)
    }

    public async show({ params, response }: HttpContext) {
        const recipeId = params.recipeId
        const recipe = await this.recipeService.findById(recipeId)

        if (!recipe) {
            return response.notFound({ message: 'Recipe not found' })
        }

        return response.ok(recipe)
    }

    public async store({ request, response }: HttpContext) {
        const payload: CreateRecipeDTO = await request.validateUsing(createRecipeValidator)
        const recipe =  this.recipeService.create(payload)
        return response.created(recipe)
    }

    public async update({ params, request, response }: HttpContext) {
        const recipeId = params.recipeId
        const payload: UpdateRecipeDTO = await request.validateUsing(updateRecipeValidator)

        const updatedRecipe = await this.recipeService.update(recipeId, payload)
        if (!updatedRecipe) {
            return response.notFound({ message: 'Recipe not found' })
        }

        return response.ok(updatedRecipe)
    }

    public async delete({ params, response }: HttpContext) {
        const recipeId = params.recipeId
        const deleted = await this.recipeService.delete(recipeId)

        if (!deleted) {
            return response.notFound({ message: 'Recipe not found ' })
        }

        return response.noContent()
    }

    public async indexIngredients({ params, response }: HttpContext) {
        const recipeId = params.recipeId
        const ingredients: RecipeIngredientDTO[] = await this.recipeService.indexIngredients(recipeId)
        return response.ok(ingredients)
    }

    public async showIngredient({ params, response }: HttpContext) {
        const { recipeId, ingredientId } = params
        const ingredient = await this.recipeService.showRecipeIngredient(recipeId, ingredientId)

        if (!ingredient) {
            return response.notFound({ message: 'Ingredient not found' })
        }

        return response.ok(ingredient)
    }

    public async addIngredient({ params, request, response }: HttpContext) {
        const recipeId = params.recipeId
        const payload: CreateRecipeIngredientDTO = await request.validateUsing(createRecipeIngredientValidator)
        const ingredient = await this.recipeService.addIngredient(recipeId, payload)
        return response.created(ingredient)
    }

    public async updateIngredient({ params, request, response }: HttpContext) {
        const { recipeId, ingredientId } = params
        const payload: UpdateRecipeIngredientDTO = await request.validateUsing(updateRecipeIngredientValidator)
        const updatedIngredient = await this.recipeService.updateIngredient(recipeId, ingredientId, payload)

        if (!updatedIngredient) {
            return response.notFound({ message: 'Ingredient not found' })
        }

        return response.ok(updatedIngredient)
    }

    public async removeIngredient({ params, response }: HttpContext) {
        const { recipeId, ingredientId } = params
        const removed = await this.recipeService.removeIngredient(recipeId, ingredientId)

        if (!removed) {
            return response.notFound({ message: 'Ingredient not found' })
        }

        return response.noContent()
    }
}