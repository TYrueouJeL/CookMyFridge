import IngredientService from "#services/ingredientService";
import { createIngredientValidator, updateIngredientValidator } from "#validators/ingredientValidators";
import { HttpContext } from "@adonisjs/core/http";
import { CreateIngredientDTO, ingredientDTO, UpdateIngredientDTO } from "../dto/ingredientDTO.js";

export default class IngredientController {
    private ingredientService = new IngredientService()

    public async index({ response }: HttpContext) {
        const ingredients: ingredientDTO[] = await this.ingredientService.list()
        return response.ok(ingredients)
    }

    public async count({ response }: HttpContext) {
        const count = await this.ingredientService.count()
        return response.ok({ count })
    }

    public async show({ params, response }: HttpContext) {
        const ingredientId = params.ingredientId
        const ingredient = await this.ingredientService.findById(ingredientId)

        if (!ingredient) {
            return response.notFound({ message: 'Ingredient not found' })
        }

        return response.ok(ingredient)
    }

    public async store({ request, response }: HttpContext) {
        const payload: CreateIngredientDTO = await request.validateUsing(createIngredientValidator)
        const ingredient = await this.ingredientService.create(payload)
        return response.created(ingredient)
    }

    public async update({ params, request, response }: HttpContext) {
        const ingredientId = params.ingredientId
        const payload: UpdateIngredientDTO = await request.validateUsing(updateIngredientValidator)
        
        const updatedIngredient = await this.ingredientService.update(ingredientId, payload)
        if (!updatedIngredient) {
            return response.notFound({ mesage: 'Ingredient not found' })
        }

        return response.ok(updatedIngredient)
    }

    public async delete({ params, response }: HttpContext) {
        const ingredientId = params.ingredientId
        const deleted = await this.ingredientService.delete(ingredientId)

        if (!deleted) {
            return response.notFound({ message: 'Ingredient not found' })
        }

        return response.noContent()
    }
}