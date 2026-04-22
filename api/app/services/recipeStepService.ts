import RecipeStep from "#models/recipeStep";
import { CreateRecipeStepDTO, UpdateRecipeStepDTO, RecipeStepDTO } from "../dto/recipeStepDTO.js";

export default class RecipeStepService {
    public async list(recipeId: number) {
        const steps = await RecipeStep
            .query()
            .where('recipe_id', recipeId)
            .orderBy('step_number', 'asc')

        return steps.map((step) => this.stepToDTO(step))
    }

    public async findById(recipeId: number, stepId: number) {
        const step = await RecipeStep
            .query()
            .where('recipe_id', recipeId)
            .where('id', stepId)
            .first()

        if (!step) {
            return null
        }

        return this.stepToDTO(step)
    }

    public async create(data: CreateRecipeStepDTO) {
        const step = await RecipeStep.create(data)
        return this.stepToDTO(step)
    }

    public async update(recipeId: number, stepId: number, data: UpdateRecipeStepDTO) {
        const step = await RecipeStep
            .query()
            .where('recipe_id', recipeId)
            .where('id', stepId)
            .first()

        if (!step) {
            return null
        }

        // If step_number is being changed, check for uniqueness
        if (data.stepNumber && data.stepNumber !== step.stepNumber) {
            const existingStep = await RecipeStep
                .query()
                .where('recipe_id', recipeId)
                .where('step_number', data.stepNumber)
                .first()

            if (existingStep) {
                throw new Error('A step with this number already exists for this recipe')
            }
        }

        step.merge(data)
        await step.save()
        return this.stepToDTO(step)
    }

    public async delete(recipeId: number, stepId: number) {
        const step = await RecipeStep
            .query()
            .where('recipe_id', recipeId)
            .where('id', stepId)
            .first()

        if (!step) {
            return false
        }

        await step.delete()
        return true
    }

    private stepToDTO(step: RecipeStep): RecipeStepDTO {
        return {
            id: step.id,
            recipeId: step.recipeId,
            stepNumber: step.stepNumber,
            description: step.description,
            durationMinutes: step.durationMinutes,
            createdAt: step.createdAt.toISO(),
            updatedAt: step.updatedAt.toISO()
        }
    }
}
