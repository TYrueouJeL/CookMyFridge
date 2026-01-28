import RecipeStepService from '#services/recipeStepService';
import { createRecipeStepValidator, updateRecipeStepValidator } from '#validators/recipeStepValidators';
import { HttpContext } from '@adonisjs/core/http';
import { CreateRecipeStepDTO, UpdateRecipeStepDTO } from '../dto/recipeStepDTO.js';

export default class RecipeStepController {
    private recipeStepService = new RecipeStepService()

    public async index({ params, response }: HttpContext) {
        const recipeId = params.recipeId
        const steps = await this.recipeStepService.list(recipeId)
        return response.ok(steps)
    }

    public async show({ params, response }: HttpContext) {
        const { recipeId, stepId } = params
        const step = await this.recipeStepService.findById(recipeId, stepId)

        if (!step) {
            return response.notFound({ message: 'Step not found' })
        }

        return response.ok(step)
    }

    public async store({ params, request, response }: HttpContext) {
        const recipeId = params.recipeId
        const payload = await request.validateUsing(createRecipeStepValidator)
        const stepPayload: CreateRecipeStepDTO = { ...payload, recipeId }
        const step = await this.recipeStepService.create(stepPayload)
        return response.created(step)
    }

    public async update({ params, request, response }: HttpContext) {
        const { recipeId, stepId } = params
        const payload: UpdateRecipeStepDTO = await request.validateUsing(updateRecipeStepValidator)

        try {
            const updatedStep = await this.recipeStepService.update(recipeId, stepId, payload)
            if (!updatedStep) {
                return response.notFound({ message: 'Step not found' })
            }
            return response.ok(updatedStep)
        } catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                return response.badRequest({ message: error.message })
            }
            throw error
        }
    }

    public async delete({ params, response }: HttpContext) {
        const { recipeId, stepId } = params
        const deleted = await this.recipeStepService.delete(recipeId, stepId)

        if (!deleted) {
            return response.notFound({ message: 'Step not found' })
        }

        return response.noContent()
    }
}
