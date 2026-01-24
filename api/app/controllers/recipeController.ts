import RecipeService from '#services/recipeService';
import { createRecipeValidator, updateRecipeValidator } from '#validators/recipeValidators';
import { HttpContext } from '@adonisjs/core/http';

export default class RecipeController {
    private recipeService = new RecipeService()

    public async index() {
        return this.recipeService.list()
    }

    public async show({ params }: HttpContext) {
        return this.recipeService.findById(params.id)
    }

    public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createRecipeValidator)
        return this.recipeService.create(payload)
    }

    public async update({ params, request }: HttpContext) {
        const payload = await request.validateUsing(updateRecipeValidator)
        return this.recipeService.update(params.id, payload)
    }

    public async delete({ params }: HttpContext) {
        return this.recipeService.delete(params.id)
    }
}