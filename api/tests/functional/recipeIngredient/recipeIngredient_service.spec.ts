import Ingredient from "#models/ingredient";
import Recipe from "#models/recipe";
import User from "#models/user";
import RecipeService from "#services/recipeService";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";
import { UnitEnum } from "../../../app/enums/unitEnum.js";

test.group('RecipeIngredient service', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('RecipeService.indexIngredients retourne tous les ingrédients d\'une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
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

        const service = new RecipeService()
        const serviceIngredients = await service.indexIngredients(recipe.id)

        assert.lengthOf(serviceIngredients, 2)
        assert.deepInclude(serviceIngredients[0], { id: serviceIngredients[0].id, quantity: 4, unit: 'piece' })
    })

    test('RecipeService.showIngredient', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 5,
                unit: 'piece'
            }
        })

        const service = new RecipeService
        const serviceIngredient = await service.showIngredient(recipe.id, ingredient.id)

        assert.equal(serviceIngredient.name, 'Tomato')
        assert.equal(serviceIngredient.quantity, 5)
        assert.equal(serviceIngredient.unit, 'piece')
    })

    test('RecipeService.addIngredient', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        const service = new RecipeService()

        await service.addIngredient(recipe.id, {
            ingredientId: ingredient.id,
            quantity: 5,
            unit: UnitEnum.PIECE
        })

        const recipeWithIngredients = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients', (query) =>
                query.pivotColumns(['quantity', 'unit'])
            )
            .firstOrFail()

        assert.lengthOf(recipeWithIngredients.ingredients, 1)

        const attached = recipeWithIngredients.ingredients[0]

        assert.equal(attached.id, ingredient.id)
        assert.equal(attached.name, 'Tomato')
        assert.equal(attached.$extras.pivot_quantity, 5)
        assert.equal(attached.$extras.pivot_unit, UnitEnum.PIECE)
    })

    test('RecipeService.updateIngredient', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 5,
                unit: 'piece'
            }
        })

        const service = new RecipeService()

        await service.updateIngredient(recipe.id, ingredient.id, {
            quantity: 6,
            unit: UnitEnum.GRAM
        })

        const recipeWithIngredients = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients', (query) =>
                query.pivotColumns(['quantity', 'unit'])
            )
            .firstOrFail()

        assert.lengthOf(recipeWithIngredients.ingredients, 1)

        const attached = recipeWithIngredients.ingredients[0]

        assert.equal(attached.id, ingredient.id)
        assert.equal(attached.name, 'Tomato')
        assert.equal(attached.$extras.pivot_quantity, 6)
        assert.equal(attached.$extras.pivot_unit, UnitEnum.GRAM)
    })

    test('RecipeService.removeIngredient', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 5,
                unit: 'piece'
            }
        })

        const service = new RecipeService()

        const result = await service.removeIngredient(recipe.id, ingredient.id)

        assert.isTrue(result)

        const recipeWithIngredients = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients')
            .firstOrFail()

        assert.lengthOf(recipeWithIngredients.ingredients, 0)

        const ingredientStillExists = await Ingredient.find(ingredient.id)
        assert.isNotNull(ingredientStillExists)

    })
})