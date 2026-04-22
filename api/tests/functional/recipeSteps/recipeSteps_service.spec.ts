import RecipeStep from '#models/recipeStep'
import Recipe from '#models/recipe'
import User from '#models/user'
import RecipeStepService from '#services/recipeStepService'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('RecipeStep service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('RecipeStepService.list retourne toutes les étapes d\'une recette', async({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        
        await RecipeStep.createMany([
            { recipeId: recipe.id, stepNumber: 1, description: 'Préparer la pâte', durationMinutes: 10 },
            { recipeId: recipe.id, stepNumber: 2, description: 'Ajouter la sauce', durationMinutes: 5 },
        ])

        const service = new RecipeStepService()
        const result = await service.list(recipe.id)

        assert.lengthOf(result, 2)
        assert.equal(result[0].stepNumber, 1)
        assert.equal(result[0].description, 'Préparer la pâte')
        assert.equal(result[0].durationMinutes, 10)
    })

    test('RecipeStepService.findById retourne une étape spécifique', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Salade', description: 'This is a salade', userId: user.id })
        const step = await RecipeStep.create({ 
            recipeId: recipe.id, 
            stepNumber: 1, 
            description: 'Laver les légumes', 
            durationMinutes: null 
        })

        const service = new RecipeStepService()
        const result = await service.findById(recipe.id, step.id)

        assert.isNotNull(result)
        assert.equal(result!.description, 'Laver les légumes')
        assert.isNull(result!.durationMinutes)
    })

    test('RecipeStepService.create crée une nouvelle étape', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Burger', description: 'This is a burger', userId: user.id })

        const service = new RecipeStepService()
        const result = await service.create({
            recipeId: recipe.id,
            stepNumber: 1,
            description: 'Griller le pain',
            durationMinutes: 3
        })

        assert.equal(result.stepNumber, 1)
        assert.equal(result.description, 'Griller le pain')
        assert.equal(result.durationMinutes, 3)
    })

    test('RecipeStepService.update met à jour une étape', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pasta', description: 'This is pasta', userId: user.id })
        const step = await RecipeStep.create({ 
            recipeId: recipe.id, 
            stepNumber: 1, 
            description: 'Cuire les pâtes', 
            durationMinutes: 8 
        })

        const service = new RecipeStepService()
        const result = await service.update(recipe.id, step.id, {
            description: 'Cuire les pâtes al dente',
            durationMinutes: 10
        })

        assert.isNotNull(result)
        assert.equal(result!.description, 'Cuire les pâtes al dente')
        assert.equal(result!.durationMinutes, 10)
    })

    test('RecipeStepService.delete supprime une étape', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Tarte', description: 'This is a tarte', userId: user.id })
        const step = await RecipeStep.create({ 
            recipeId: recipe.id, 
            stepNumber: 1, 
            description: 'Préparer la pâte', 
            durationMinutes: 15 
        })

        const service = new RecipeStepService()
        const result = await service.delete(recipe.id, step.id)

        assert.isTrue(result)
        
        const deletedStep = await RecipeStep.find(step.id)
        assert.isNull(deletedStep)
    })
})
