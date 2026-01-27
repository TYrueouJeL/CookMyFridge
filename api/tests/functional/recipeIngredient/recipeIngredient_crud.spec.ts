import Ingredient from "#models/ingredient";
import Recipe from "#models/recipe";
import User from "#models/user";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";

test.group('RecipeIngredient CRUD', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('CREATE : créer un ingrédient pour une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })
        
        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 4,
                unit: 'piece'
            }
        })

        const recipeWithIngredient = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients', (query) =>
                query.pivotColumns(['quantity', 'unit'])
            )
            .firstOrFail()
        
        assert.lengthOf(recipeWithIngredient.ingredients, 1)

        const attached = recipeWithIngredient.ingredients[0]

        assert.equal(attached.id, ingredient.id)
        assert.equal(attached.name, 'Tomato')
        assert.equal(attached.$extras.pivot_quantity, 4)
        assert.equal(attached.$extras.pivot_unit, 'piece')
    })

    test('READ : lire un ingrédient pour un recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 4,
                unit: 'piece'
            }
        })

        const recipeWithIngredient = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients', (query) =>
                query.pivotColumns(['quantity', 'unit'])
            )
            .firstOrFail()

        assert.lengthOf(recipeWithIngredient.ingredients, 1)

        const attached = recipeWithIngredient.ingredients[0]

        assert.equal(attached.id, ingredient.id)
        assert.equal(attached.name, 'Tomato')
        assert.equal(attached.$extras.pivot_quantity, 4)
        assert.equal(attached.$extras.pivot_unit, 'piece')
    })

    test('UPDATE : modifier un ingrédient d\'une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 4,
                unit: 'piece'
            }
        })

        await recipe
            .related('ingredients')
            .pivotQuery()
            .where('ingredient_id', ingredient.id)
            .update({
                quantity: 3,
                unit: 'g'
            })
        
        const updated = await recipe
            .related('ingredients')
            .query()
            .pivotColumns(['quantity', 'unit'])
            .where('ingredients.id', ingredient.id)
            .firstOrFail()
        
        assert.equal(updated.$extras.pivot_quantity, 3)
        assert.equal(updated.$extras.pivot_unit, 'g')
    })

    test('DELETE : supprimer un ingrédient d\'une recette', async ({ assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const recipe = await Recipe.create({ name: 'Pizza', description: 'This is a pizza', userId: user.id })
        const ingredient = await Ingredient.create({ name: 'Tomato' })

        await recipe.related('ingredients').attach({
            [ingredient.id]: {
                quantity: 4,
                unit: 'piece'
            }
        })

        await recipe.related('ingredients').detach([ingredient.id])

        const recipeWithIngredient = await Recipe
            .query()
            .where('id', recipe.id)
            .preload('ingredients')
            .firstOrFail()
        
        assert.lengthOf(recipeWithIngredient.ingredients, 0)
    })
})