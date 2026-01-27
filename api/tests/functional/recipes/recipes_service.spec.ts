import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import User from '#models/user'
import RecipeService from '#services/recipeService'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('RecipeService.list retourne toutes les recettes', async({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        await Recipe.createMany([
            { name: 'Pizza', description: 'This is a pizza', userId: user.id },
            { name: 'Burger', description: 'This is a burger', userId: user.id },
        ])

        const service = new RecipeService()
        const recipes = await service.list()

        assert.lengthOf(recipes, 2)
        assert.equal(recipes[0].name, 'Pizza')
        assert.equal(recipes[0].description, 'This is a pizza')
        assert.equal(recipes[0].user.id, user.id)
        assert.equal(recipes[0].user.fullName, 'User')
        assert.equal(recipes[0].user.email, 'user@gmail.com')
    })

    test('RecipeService.findById retourne une recette avec ses ingrédients', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Salade', description: 'This is a salade', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomate' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: { quantity: 2, unit: 'piece' }
        })

        const service = new RecipeService()
        const result = await service.findById(recipe.id)

        assert.equal(result.name, 'Salade')
        assert.equal(result.description, 'This is a salade')
        assert.equal(result.user.id, user.id)
        assert.lengthOf(result.ingredients, 1)
        assert.equal(result.ingredients[0].quantity, 2)
    })

    test('RecipeService.create créé une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const service = new RecipeService()

        const recipe = await service.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })

        assert.exists(recipe.id)
        assert.equal(recipe.name, 'Pizza')
        assert.equal(recipe.description, 'This is a pizza')
        assert.equal(recipe.userId, user.id)
    })

    test('RecipeService.update modifie une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Soup', description: 'This is a soup', userId: user.id })
        
        const service = new RecipeService()
        const updated = await service.update(recipe.id, { name: 'Tomato Soup', description: 'This is a tomato soup' })


        assert.equal(updated.name, 'Tomato Soup')
        assert.equal(updated.description, 'This is a tomato soup')
        assert.equal(updated.userId, user.id)
    })

    test('RecipeService.delete suppression d\'une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Cake', description: 'This is a cake', userId: user.id })

        const service = new RecipeService()
        const result = await service.delete(recipe.id)

        const deleted = await Recipe.find(recipe.id)

        assert.isTrue(result)
        assert.isNull(deleted)
    })
})