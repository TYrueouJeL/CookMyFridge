/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import IngredientController from '#controllers/ingredientController'
import RecipeController from '#controllers/recipeController'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.get('/', [RecipeController, 'index'])
  router.post('/', [RecipeController, 'store'])
  router.get('/:recipeId', [RecipeController, 'show'])
  router.put('/:recipeId', [RecipeController, 'update'])
  router.delete('/:recipeId', [RecipeController, 'delete'])

  router.group(() => {
    router.get('/', [RecipeController, 'indexIngredients'])
    router.post('/', [RecipeController, 'addIngredient'])
    router.get('/:ingredientId', [RecipeController, 'showIngredient'])
    router.put('/:ingredientId', [RecipeController, 'updateIngredient'])
    router.delete('/:ingredientId', [RecipeController, 'removeIngredient'])
  })
  .prefix('/:recipeId/ingredients')
})
.prefix('/recipes')

router.group(() => {
  router.get('/', [IngredientController, 'index'])
  router.post('/', [IngredientController, 'store'])
  router.get('/:ingredientId', [IngredientController, 'show'])
  router.put('/:ingredientId', [IngredientController, 'update'])
  router.delete('/:ingredientId', [IngredientController, 'delete'])
})
.prefix('/ingredients')