import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('GET /recipes', async ({ client, assert }) => {
    await Recipe.createMany([
      { name: 'Pizza' },
      { name: 'Burger' }
    ])

    const response = await client.get('/recipes').send()

    assert.equal(response.status(), 200)
    assert.lengthOf(response.body(), 2)
    assert.deepInclude(response.body()[0], { name: 'Pizza' })
  })

  test('POST /recipes', async ({ client, assert }) => {
    const response = await client.post('/recipes').json({
      name: 'Pizza'
    })

    assert.equal(response.status(), 201)

    assert.exists(response.body().id)
    assert.equal(response.body().name, 'Pizza')

    const recipeInDb = await Recipe.find(response.body().id)
    assert.exists(recipeInDb)
    assert.equal(recipeInDb!.name, 'Pizza')
  })

  test('GET /recipes/:recipeId', async ({ client, assert }) => {
    const recipe = await Recipe.create({ name: 'Pizza' })

    const ingredients = await Ingredient.createMany([
      { name: 'Potato flour' },
      { name: 'Lemon' }
    ])

    await recipe.related('ingredients').attach({
      [ingredients[0].id]: { quantity: 189, unit: 'g' },
      [ingredients[1].id]: { quantity: 383, unit: 'g' }
    })

    const response = await client.get(`/recipes/${recipe.id}`)

    assert.equal(response.status(), 200)
    assert.equal(response.body().id, recipe.id)
    assert.equal(response.body().name, recipe.name)

    assert.lengthOf(response.body().ingredients, 2)

    assert.deepInclude(response.body().ingredients, {
      id: ingredients[0].id,
      name: 'Potato flour',
      quantity: 189,
      unit: 'g'
    })

    assert.deepInclude(response.body().ingredients, {
      id: ingredients[1].id,
      name: 'Lemon',
      quantity: 383,
      unit: 'g'
    })
  })

  test('PUT /recipes/:recipeId', async ({ client, assert }) => {
    const recipe = await Recipe.create({ name: 'Pizza' })

    const response = await client.put(`/recipes/${recipe.id}`).json({
      name: 'Burger'
    })

    assert.equal(response.status(), 200)
    assert.equal(response.body().id, recipe.id)
    assert.equal(response.body().name, 'Burger')

    const recipeInDb = await Recipe.find(recipe.id)
    assert.exists(recipeInDb)
    assert.equal(recipeInDb!.name, 'Burger')
  })

  test('DELETE /recipes/:recipeId', async ({ client, assert }) => {
    const recipe = await Recipe.create({ name: 'Pizza' })

    const response = await client.delete(`/recipes/${recipe.id}`)

    assert.equal(response.status(), 204)

    const recipeInDb = await Recipe.find(recipe.id)
    assert.isNull(recipeInDb)
  })
})