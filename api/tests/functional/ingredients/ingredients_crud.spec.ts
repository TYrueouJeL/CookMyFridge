import Ingredient from "#models/ingredient";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";

test.group('Ingredients CRUD', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('CREATE : créer un ingrédient', async ({ assert }) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        assert.exists(ingredient.id)
        assert.equal(ingredient.name, 'Tomato')
    })

    test('READ : lire un iongrédient', async ({ assert }) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        const found = await Ingredient.find(ingredient.id)

        assert.isNotNull(found)
        assert.equal(found!.name, 'Tomato')
    })

    test('UPDATE : modifier un ingérient', async ({ assert }) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        ingredient.name = 'Potato'
        await ingredient.save()

        const updated = await Ingredient.find(ingredient.id)

        assert.equal(updated!.name, 'Potato')
    })

    test('DELETE : supprimer un ingrédient', async ({ assert} ) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        await ingredient.delete()

        const deleted = await Ingredient.find(ingredient.id)

        assert.isNull(deleted)
    })
})