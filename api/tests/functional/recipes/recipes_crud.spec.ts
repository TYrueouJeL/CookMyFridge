import Recipe from '#models/recipe'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes CRUD', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('CREATE : créer une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Pancakes', description: 'This is a pancake' })

    assert.exists(recipe.id)
    assert.equal(recipe.name, 'Pancakes')
    assert.equal(recipe.description, 'This is a pancake')
  })

  test('READ : lire une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Omelette', description: 'This is a omelette' })

    const found = await Recipe.find(recipe.id)

    assert.isNotNull(found)
    assert.equal(found!.name, 'Omelette')
    assert.equal(found!.description, 'This is a omelette')
  })

  test('UPDATE : modifier une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a Pizza' })

    recipe.name = 'Pizza Margherita'
    recipe.description = 'This is a margherita'
    await recipe.save()

    const updated = await Recipe.find(recipe.id)

    assert.equal(updated!.name, 'Pizza Margherita')
    assert.equal(updated!.description, 'This is a margherita')
  })

  test('DELETE : supprimer une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Burger', description: 'This is a Burger' })

    await recipe.delete()

    const deleted = await Recipe.find(recipe.id)

    assert.isNull(deleted)
  })
})