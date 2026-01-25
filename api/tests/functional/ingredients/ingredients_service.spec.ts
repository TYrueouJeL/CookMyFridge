import Ingredient from "#models/ingredient";
import IngredientService from "#services/ingredientService";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";

test.group('Ingredient service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('IngredientService.list retourne tous les ingrédients', async ({ assert }) => {
        await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato' },
        ])

        const service = new IngredientService()
        const ingredients = await service.list()

        assert.lengthOf(ingredients, 2)
        assert.deepInclude(ingredients[0], { id: ingredients[0].id, name: 'Tomato' })
    })

    test('IngredientService.findById', async ({ assert }) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        const service = new IngredientService()
        const result = await service.findById(ingredient.id)

        assert.equal(result.name, 'Tomato')
    })

    test('IngredientServioce.create', async ({ assert }) => {
        const service = new IngredientService()

        const ingredient = await service.create({ name: 'Tomato' })

        assert.exists(ingredient.id)
        assert.equal(ingredient.name, 'Tomato')
    })

    test('IngredientService.update modifie un ingrédient', async ({ assert }) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        const service = new IngredientService()
        const updated = await service.update(ingredient.id, { name: 'Potato' })

        assert.equal(updated.name, 'Potato')
    })

    test('IngredientService.delete suppression d\'un ingrédient', async ({ assert}) => {
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        const service = new IngredientService()
        const result = await service.delete(ingredient.id)

        const deleted = await Ingredient.find(ingredient.id)

        assert.isTrue(result)
        assert.isNull(deleted)
    })
})