import RecipeService from '#services/recipeService';
import { createRecipeIngredientValidator, updateRecipeIngredientValidator } from '#validators/recipeIngredientValidator';
import { createRecipeValidator, updateRecipeValidator } from '#validators/recipeValidators';
import { HttpContext } from '@adonisjs/core/http';
import { CreateRecipeDTO, UpdateRecipeDTO } from '../dto/recipeDTO.js';
import { CreateRecipeIngredientDTO, RecipeIngredientDTO, UpdateRecipeIngredientDTO } from '../dto/recipeIngredientDTO.js';

export default class RecipeController {
    private recipeService = new RecipeService()

    public async index({ request, response }: HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        const result = await this.recipeService.list(page, limit)
        return response.ok(result)
    }

    public async show({ params, response }: HttpContext) {
        const recipeId = params.recipeId
        const recipe = await this.recipeService.findById(recipeId)

        if (!recipe) {
            return response.notFound({ message: 'Recipe not found' })
        }

        return response.ok(recipe)
    }

    public async store({ request, response, auth }: HttpContext) {
        const payload = await request.validateUsing(createRecipeValidator)
        const user = await auth.authenticate()
        const recipePayload: CreateRecipeDTO = { ...payload, userId: user.id }
        const recipe =  await this.recipeService.create(recipePayload)
        return response.created(recipe)
    }

    public async update({ params, request, response, auth }: HttpContext) {
        const recipeId = params.recipeId
        const user = await auth.authenticate()
        const payload: UpdateRecipeDTO = await request.validateUsing(updateRecipeValidator)

        const updatedRecipe = await this.recipeService.update(recipeId, payload)
        if (!updatedRecipe) {
            return response.notFound({ message: 'Recipe not found' })
        }

        if (updatedRecipe.userId !== user.id) {
            return response.forbidden({ message: 'You are not allowed to update this recipe' })
        }

        return response.ok(updatedRecipe)
    }

    public async delete({ params, response, auth }: HttpContext) {
        const recipeId = params.recipeId
        const user = await auth.authenticate()
        const recipe = await this.recipeService.findById(recipeId)

        if (!recipe) {
            return response.notFound({ message: 'Recipe not found' })
        }

        if (recipe.user?.id !== user.id) {
            return response.forbidden({ message: 'You are not allowed to delete this recipe' })
        }

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
        const ingredient = await this.recipeService.showIngredient(recipeId, ingredientId)

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