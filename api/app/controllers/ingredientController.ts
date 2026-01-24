import IngredientService from "#services/ingredientService";
import { createIngredientValidator, updateIngredientValidator } from "#validators/ingredientValidators";
import { HttpContext } from "@adonisjs/core/http";

export default class IngredientController {
    private ingredientService = new IngredientService()

    public async index() {
        return this.ingredientService.list()
    }

    public async show({ params }: HttpContext) {
        return this.ingredientService.findById(params.id)
    }

    public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createIngredientValidator)
        return this.ingredientService.create(payload)
    }

    public async update({ params, request }: HttpContext) {
        const payload = await request.validateUsing(updateIngredientValidator)
        return this.ingredientService.update(params.id, payload)
    }

    public async delete({ params }: HttpContext) {
        return this.ingredientService.delete(params.id)
    }
}