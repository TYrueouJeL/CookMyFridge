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
  router.get('/:id', [RecipeController, 'show'])
  router.put('/:id', [RecipeController, 'update'])
  router.delete('/:id', [RecipeController, 'delete'])
})
.prefix('/recipes')

router.group(() => {
  router.get('/', [IngredientController, 'index'])
  router.post('/', [IngredientController, 'store'])
  router.get('/:id', [IngredientController, 'show'])
  router.put('/:id', [IngredientController, 'update'])
  router.delete('/:id', [IngredientController, 'delete'])
})
.prefix('/ingredients')