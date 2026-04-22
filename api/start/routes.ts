/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import AuthController from '#controllers/authController'
import IngredientController from '#controllers/ingredientController'
import RecipeController from '#controllers/recipeController'
import RecipeStepController from '#controllers/recipeStepController'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))

router.group(() => {
  router.get('/', [RecipeController, 'index'])
  router.get('/count', [RecipeController, 'count'])
  router.post('/', [RecipeController, 'store']).use(middleware.auth({ guards: ['api'] }))
  router.get('/:recipeId', [RecipeController, 'show'])
  router.put('/:recipeId', [RecipeController, 'update']).use(middleware.auth({ guards: ['api'] }))
  router.delete('/:recipeId', [RecipeController, 'delete']).use(middleware.auth({ guards: ['api'] }))

  router.group(() => {
    router.get('/', [RecipeController, 'indexIngredients'])
    router.post('/', [RecipeController, 'addIngredient'])
    router.get('/:ingredientId', [RecipeController, 'showIngredient'])
    router.put('/:ingredientId', [RecipeController, 'updateIngredient'])
    router.delete('/:ingredientId', [RecipeController, 'removeIngredient'])
  })
  .prefix('/:recipeId/ingredients').use(middleware.auth({ guards: ['api'] }))

  router.group(() => {
    router.get('/', [RecipeStepController, 'index'])
    router.post('/', [RecipeStepController, 'store']).use(middleware.auth({ guards: ['api'] }))
    router.get('/:stepId', [RecipeStepController, 'show'])
    router.put('/:stepId', [RecipeStepController, 'update']).use(middleware.auth({ guards: ['api'] }))
    router.delete('/:stepId', [RecipeStepController, 'delete']).use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/:recipeId/steps')
})
.prefix('/recipes')

router.group(() => {
  router.get('/', [IngredientController, 'index'])
  router.get('/count', [IngredientController, 'count'])
  router.post('/', [IngredientController, 'store'])
  router.get('/:ingredientId', [IngredientController, 'show'])
  router.put('/:ingredientId', [IngredientController, 'update'])
  router.delete('/:ingredientId', [IngredientController, 'delete'])
})
.prefix('/ingredients').use(middleware.auth({ guards: ['api'] }))