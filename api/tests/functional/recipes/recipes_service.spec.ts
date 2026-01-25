import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import RecipeService from '#services/recipeService'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('RecipeService.list retourne toutes les recettes', async({ assert }) => {
        await Recipe.createMany([
            { name: 'Pizza' },
            { name: 'Burger' },
        ])

        const service = new RecipeService()
        const recipes = await service.list()

        assert.lengthOf(recipes, 2)
        assert.deepInclude(recipes[0], { id: recipes[0].id, name: 'Pizza' })
    })

    test('RecipeService.findById retourne une recette avec ses ingrédients', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Salade' })
        const ingredient = await Ingredient.create({ name: 'Tomate' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: { quantity: 2, unit: 'piece' }
        })

        const service = new RecipeService()
        const result = await service.findById(recipe.id)

        assert.equal(result.name, 'Salade')
        assert.lengthOf(result.ingredients, 1)
        assert.equal(result.ingredients[0].quantity, 2)
    })

    test('RecipeService.create créé une recette', async ({ assert }) => {
        const service = new RecipeService()

        const recipe = await service.create({ name: 'Pizza' })

        assert.exists(recipe.id)
        assert.equal(recipe.name, 'Pizza')
    })

    test('RecipeService.update met à jour une recette', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Soup' })
        
        const service = new RecipeService()
        const updated = await service.update(recipe.id, { name: 'Tomato Soup' })


        assert.equal(updated.name, 'Tomato Soup')
    })

    test('RecipeService.delete suppression d\'une recette', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Cake' })

        const service = new RecipeService()
        const result = await service.delete(recipe.id)

        const deleted = await Recipe.find(recipe.id)

        assert.isTrue(result)
        assert.isNull(deleted)
    })
})