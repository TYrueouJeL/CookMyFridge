import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('GET /recipes', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    await Recipe.createMany([
      { name: 'Pizza', description: 'This is a Pizza', userId: user.id },
      { name: 'Burger', description: 'This is a Burger', userId: user.id }
    ])

    const response = await client.get('/recipes').send()

    assert.equal(response.status(), 200)
    assert.equal(response.body().total, 2)
    assert.equal(response.body().page, 1)
    assert.equal(response.body().limit, 10)
    assert.lengthOf(response.body().data, 2)
    assert.equal(response.body().data[0].name, 'Pizza')
    assert.equal(response.body().data[0].description, 'This is a Pizza')
    assert.equal(response.body().data[0].user.id, user.id)
  })

  test('POST /recipes', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const response = await client.post('/recipes').bearerToken(token.value!.release()).json({
      name: 'Pizza',
      description: 'This is a Pizza'
    })

    assert.equal(response.status(), 201)
    assert.exists(response.body().id)
    assert.equal(response.body().name, 'Pizza')
    assert.equal(response.body().description, 'This is a Pizza')

    const recipeInDb = await Recipe.find(response.body().id)
    assert.exists(recipeInDb)
    assert.equal(recipeInDb!.name, 'Pizza')
    assert.equal(recipeInDb!.description, 'This is a Pizza')
    assert.equal(recipeInDb!.userId, user.id)
  })

  test('GET /recipes/:recipeId', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })

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
    assert.equal(response.body().description, 'This is a Pizza')
    assert.equal(response.body().user.id, user.id)
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
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })

    const response = await client.put(`/recipes/${recipe.id}`).bearerToken(token.value!.release()).json({
      name: 'Burger',
      description: 'This is a Burger'
    })

    assert.equal(response.status(), 200)
    assert.equal(response.body().id, recipe.id)
    assert.equal(response.body().name, 'Burger')
    assert.equal(response.body().description, 'This is a Burger')

    const recipeInDb = await Recipe.find(recipe.id)
    assert.exists(recipeInDb)
    assert.equal(recipeInDb!.name, 'Burger')
    assert.equal(recipeInDb!.description, 'This is a Burger')
    assert.equal(recipeInDb!.userId, user.id)
  })

  test('DELETE /recipes/:recipeId', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })

    const response = await client.delete(`/recipes/${recipe.id}`).bearerToken(token.value!.release())

    assert.equal(response.status(), 204)

    const recipeInDb = await Recipe.find(recipe.id)
    assert.isNull(recipeInDb)
  })
})