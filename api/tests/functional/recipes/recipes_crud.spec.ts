import Recipe from '#models/recipe'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes CRUD', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('CREATE : créer une recette', async ({ assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Pancakes', description: 'This is a pancake', userId: user.id })

    assert.exists(recipe.id)
    assert.equal(recipe.name, 'Pancakes')
    assert.equal(recipe.description, 'This is a pancake')
    assert.equal(recipe.userId, user.id)
  })

  test('READ : lire une recette', async ({ assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Omelette', description: 'This is a omelette', userId: user.id })

    const found = await Recipe.find(recipe.id)

    assert.isNotNull(found)
    assert.equal(found!.name, 'Omelette')
    assert.equal(found!.description, 'This is a omelette')
    assert.equal(found!.userId, user.id)
  })

  test('UPDATE : modifier une recette', async ({ assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza', userId: user.id })

    recipe.name = 'Pizza Margherita'
    recipe.description = 'This is a margherita'
    await recipe.save()

    const updated = await Recipe.find(recipe.id)

    assert.equal(updated!.name, 'Pizza Margherita')
    assert.equal(updated!.description, 'This is a margherita')
    assert.equal(updated!.userId, user.id)
  })

  test('DELETE : supprimer une recette', async ({ assert }) => {
    const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
    const recipe = await Recipe.create({ name: 'Burger', description: 'This is a Burger', userId: user.id })

    await recipe.delete()

    const deleted = await Recipe.find(recipe.id)

    assert.isNull(deleted)
  })
})