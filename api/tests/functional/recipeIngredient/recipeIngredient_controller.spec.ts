import Ingredient from "#models/ingredient";
import Recipe from "#models/recipe";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";

test.group('RecipeIngredient controller', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('GET /recipes/:recipeId/ingredients', async ({ client, assert }) => {
        const recipe = await Recipe.create({ name: 'Pizza' })
        const ingredients = await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' }
        ])

        await recipe.related('ingredients').attach({
            [ingredients[0].id]: {
                quantity: 4,
                unit: 'piece'
            },
            [ingredients[1].id]: {
                quantity: 3,
                unit: 'g'
            }
        })

        const response = await client.get(`/recipes/${recipe.id}/ingredients`).send()

        assert.equal(response.status(), 200)
        assert.lengthOf(response.body(), 2)
        assert.deepInclude(response.body()[0], { quantity: 4, unit: 'piece' })
    })

    test('POST /recipes/:recipeId/ingredients', async ({ client, assert }) => {
        const recipe = await Recipe.create({ name: 'Pizza' })
        const ingredients = await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' }
        ])

        const response = await client.post(`/recipes/${recipe.id}/ingredients`).json({
            ingredientId: ingredients[0].id,
            quantity: 4,
            unit: 'piece'
        })

        assert.equal(response.status(), 201)
        assert.equal(response.body().id, ingredients[0].id)
        assert.equal(response.body().quantity, 4)
        assert.equal(response.body().unit, 'piece')
    })

    test('GET /recipes/:recipeId/ingredients/:ingredientId', async ({ client, assert }) => {
        const recipe = await Recipe.create({ name: 'Pizza' })
        const ingredients = await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' }
        ])

        await recipe.related('ingredients').attach({
            [ingredients[0].id]: {
                quantity: 4,
                unit: 'piece'
            },
            [ingredients[1].id]: {
                quantity: 3,
                unit: 'g'
            }
        })

        const response = await client.get(`/recipes/${recipe.id}/ingredients/${ingredients[0].id}`)

        assert.equal(response.status(), 200)
        assert.equal(response.body().id, ingredients[0].id)
        assert.equal(response.body().quantity, 4)
        assert.equal(response.body().unit, 'piece')
    })

    test('PUT /recipes/:recipeId/ingredients/:ingredientId', async ({ client, assert }) => {
        const recipe = await Recipe.create({ name: 'Pizza' })
        const ingredients = await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' }
        ])

        await recipe.related('ingredients').attach({
            [ingredients[0].id]: {
                quantity: 4,
                unit: 'piece'
            },
            [ingredients[1].id]: {
                quantity: 3,
                unit: 'g'
            }
        })

        const response = await client.put(`/recipes/${recipe.id}/ingredients/${ingredients[0].id}`).json({
            ingredientId: ingredients[0].id,
            quantity: 5,
            unit: 'kg'
        })

        assert.equal(response.status(), 200)
        assert.equal(response.body().id, ingredients[0].id)
        assert.equal(response.body().quantity, 5)
        assert.equal(response.body().unit, 'kg')
    })

    test('DELETE /recipes/:recipeId/ingredients/:ingredientId', async ({ client, assert }) => {
        const recipe = await Recipe.create({ name: 'Pizza' })
        const ingredients = await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' }
        ])

        await recipe.related('ingredients').attach({
            [ingredients[0].id]: {
                quantity: 4,
                unit: 'piece'
            },
            [ingredients[1].id]: {
                quantity: 3,
                unit: 'g'
            }
        })

        const response = await client.delete(`/recipes/${recipe.id}/ingredients/${ingredients[0].id}`)

        assert.equal(response.status(), 204)

        const recipeIngredientInDb = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients', (query) =>
                query.pivotColumns(['quantity', 'unit'])
            )
            .firstOrFail()

        assert.lengthOf(recipeIngredientInDb.ingredients, 1)
    })
})