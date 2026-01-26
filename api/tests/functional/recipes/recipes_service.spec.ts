import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import RecipeService from '#services/recipeService'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('RecipeService.list retourne toutes les recettes', async({ assert }) => {
        await Recipe.createMany([
            { name: 'Pizza', description: 'This is a pizza' },
            { name: 'Burger', description: 'This is a burger' },
        ])

        const service = new RecipeService()
        const recipes = await service.list()

        assert.lengthOf(recipes, 2)
        assert.deepInclude(recipes[0], { id: recipes[0].id, name: 'Pizza', description: 'This is a pizza' })
    })

    test('RecipeService.findById retourne une recette avec ses ingrédients', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Salade', description: 'This is a salade' })
        const ingredient = await Ingredient.create({ name: 'Tomate' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: { quantity: 2, unit: 'piece' }
        })

        const service = new RecipeService()
        const result = await service.findById(recipe.id)

        assert.equal(result.name, 'Salade')
        assert.equal(result.description, 'This is a salade')
        assert.lengthOf(result.ingredients, 1)
        assert.equal(result.ingredients[0].quantity, 2)
    })

    test('RecipeService.create créé une recette', async ({ assert }) => {
        const service = new RecipeService()

        const recipe = await service.create({ name: 'Pizza', description: 'This is a pizza' })

        assert.exists(recipe.id)
        assert.equal(recipe.name, 'Pizza')
        assert.equal(recipe.description, 'This is a pizza')
    })

    test('RecipeService.update modifie une recette', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Soup', description: 'This is a soup' })
        
        const service = new RecipeService()
        const updated = await service.update(recipe.id, { name: 'Tomato Soup', description: 'This is a tomato soup' })


        assert.equal(updated.name, 'Tomato Soup')
        assert.equal(updated.description, 'This is a tomato soup')
    })

    test('RecipeService.delete suppression d\'une recette', async ({ assert }) => {
        const recipe = await Recipe.create({ name: 'Cake', description: 'This is a cake' })

        const service = new RecipeService()
        const result = await service.delete(recipe.id)

        const deleted = await Recipe.find(recipe.id)

        assert.isTrue(result)
        assert.isNull(deleted)
    })
})