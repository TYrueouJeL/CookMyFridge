import Ingredient from "#models/ingredient";
import User from "#models/user";
import testUtils from "@adonisjs/core/services/test_utils";
import { test } from "@japa/runner";

test.group('Ingredient controller', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('GET /ingredients', async ({ client, assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const token = await User.accessTokens.create(user)
        await Ingredient.createMany([
            { name: 'Tomato' },
            { name: 'Potato'}
        ])

        const response = await client.get('/ingredients').bearerToken(token.value!.release()).send()

        assert.equal(response.status(), 200)
        assert.lengthOf(response.body(), 2)
        assert.deepInclude(response.body()[0], { name: 'Tomato' })
    })

    test('POST /ingredients', async ({ client, assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const token = await User.accessTokens.create(user)
        const response = await client.post('/ingredients').bearerToken(token.value!.release()).json({
            name: 'Tomato'
        })

        assert.equal(response.status(), 201)

        assert.exists(response.body().id)
        assert.equal(response.body().name, 'Tomato')

        const ingredientInDb = await Ingredient.find(response.body().id)
        assert.exists(ingredientInDb)
        assert.equal(ingredientInDb!.name, 'Tomato')
    })

    test('GET /ingredients/:ingredientId', async ({ client, assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const token = await User.accessTokens.create(user)
        const ingredient = await Ingredient.create({ name: 'Pizza' })
    
        const response = await client.get(`/ingredients/${ingredient.id}`).bearerToken(token.value!.release())
    
        assert.equal(response.status(), 200)
        assert.equal(response.body().id, ingredient.id)
        assert.equal(response.body().name, ingredient.name)
    })

    test('PUT /ingredients/:ingredientId', async ({ client, assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const token = await User.accessTokens.create(user)
        const ingredient = await Ingredient.create({ name: 'Pizza' })

        const response = await client.put(`/ingredients/${ingredient.id}`).bearerToken(token.value!.release()).json({
            name: 'Burger'
        })

        assert.equal(response.status(), 200)
        assert.equal(response.body().id, ingredient.id)
        assert.equal(response.body().name, 'Burger')

        const ingredientInDb = await Ingredient.find(ingredient.id)
        assert.exists(ingredientInDb)
        assert.equal(ingredientInDb!.name, 'Burger')
    })

    test('DELETE /ingredients/:ingredientId', async ({ client, assert }) => {
        const user = await User.create({ fullName: 'User', email: 'user@gmail.com', password: 'PAssword123*' })
        const token = await User.accessTokens.create(user)
        const ingredient = await Ingredient.create({ name: 'Pizza' })

        const response = await client.delete(`/ingredients/${ingredient.id}`).bearerToken(token.value!.release())

        assert.equal(response.status(), 204)

        const ingredientInDb = await Ingredient.find(ingredient.id)
        assert.isNull(ingredientInDb)
    })
})