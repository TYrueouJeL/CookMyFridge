import Recipe from '#models/recipe'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Recipes CRUD', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('CREATE : créer une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Pancakes' })

    assert.exists(recipe.id)
    assert.equal(recipe.name, 'Pancakes')
  })

  test('READ : lire une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Omelette' })

    const found = await Recipe.find(recipe.id)

    assert.isNotNull(found)
    assert.equal(found!.name, 'Omelette')
  })

  test('UPDATE : modifier une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Pizza' })

    recipe.name = 'Pizza Margherita'
    await recipe.save()

    const updated = await Recipe.find(recipe.id)

    assert.equal(updated!.name, 'Pizza Margherita')
  })

  test('DELETE : supprimer une recette', async ({ assert }) => {
    const recipe = await Recipe.create({ name: 'Burger' })

    await recipe.delete()

    const deleted = await Recipe.find(recipe.id)

    assert.isNull(deleted)
  })
})