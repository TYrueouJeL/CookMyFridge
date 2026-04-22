import RecipeStep from '#models/recipeStep'
import Recipe from '#models/recipe'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('RecipeStep controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('GET /recipes/:recipeId/steps', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })
    
    await RecipeStep.createMany([
      { recipeId: recipe.id, stepNumber: 1, description: 'Préparer la pâte', durationMinutes: 10 },
      { recipeId: recipe.id, stepNumber: 2, description: 'Ajouter la sauce', durationMinutes: 5 }
    ])

    const response = await client.get(`/recipes/${recipe.id}/steps`).send()

    assert.equal(response.status(), 200)
    assert.lengthOf(response.body(), 2)
    assert.equal(response.body()[0].stepNumber, 1)
    assert.equal(response.body()[0].description, 'Préparer la pâte')
    assert.equal(response.body()[0].durationMinutes, 10)
  })

  test('POST /recipes/:recipeId/steps', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })
    
    const response = await client
      .post(`/recipes/${recipe.id}/steps`)
      .bearerToken(token.value!.release())
      .json({
        stepNumber: 1,
        description: 'Préparer la pâte',
        durationMinutes: 10
      })

    assert.equal(response.status(), 201)
    assert.exists(response.body().id)
    assert.equal(response.body().stepNumber, 1)
    assert.equal(response.body().description, 'Préparer la pâte')
    assert.equal(response.body().durationMinutes, 10)

    const stepInDb = await RecipeStep.find(response.body().id)
    assert.exists(stepInDb)
    assert.equal(stepInDb!.stepNumber, 1)
    assert.equal(stepInDb!.recipeId, recipe.id)
  })

  test('GET /recipes/:recipeId/steps/:stepId', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })
    const step = await RecipeStep.create({ 
      recipeId: recipe.id, 
      stepNumber: 1, 
      description: 'Préparer la pâte', 
      durationMinutes: 10 
    })

    const response = await client.get(`/recipes/${recipe.id}/steps/${step.id}`).send()

    assert.equal(response.status(), 200)
    assert.equal(response.body().id, step.id)
    assert.equal(response.body().stepNumber, 1)
    assert.equal(response.body().description, 'Préparer la pâte')
  })

  test('PUT /recipes/:recipeId/steps/:stepId', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })
    const step = await RecipeStep.create({ 
      recipeId: recipe.id, 
      stepNumber: 1, 
      description: 'Préparer la pâte', 
      durationMinutes: 10 
    })

    const response = await client
      .put(`/recipes/${recipe.id}/steps/${step.id}`)
      .bearerToken(token.value!.release())
      .json({
        description: 'Préparer la pâte à pizza',
        durationMinutes: 15
      })

    assert.equal(response.status(), 200)
    assert.equal(response.body().description, 'Préparer la pâte à pizza')
    assert.equal(response.body().durationMinutes, 15)

    const stepInDb = await RecipeStep.find(step.id)
    assert.equal(stepInDb!.description, 'Préparer la pâte à pizza')
    assert.equal(stepInDb!.durationMinutes, 15)
  })

  test('DELETE /recipes/:recipeId/steps/:stepId', async ({ client, assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const token = await User.accessTokens.create(user)
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })
    const step = await RecipeStep.create({ 
      recipeId: recipe.id, 
      stepNumber: 1, 
      description: 'Préparer la pâte', 
      durationMinutes: 10 
    })

    const response = await client
      .delete(`/recipes/${recipe.id}/steps/${step.id}`)
      .bearerToken(token.value!.release())
      .send()

    assert.equal(response.status(), 204)

    const stepInDb = await RecipeStep.find(step.id)
    assert.isNull(stepInDb)
  })
})
