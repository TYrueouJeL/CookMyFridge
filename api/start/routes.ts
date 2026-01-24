/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import RecipeController from '#controllers/recipeController'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.get('/', async () => {
    const controller = new RecipeController()
    return controller.index()
  })
  router.get('/:id', async (ctx) => {
    const controller = new RecipeController()
    return controller.show(ctx)
  })
  router.post('/', 'RecipesController.store')
  router.put('/:id', 'RecipesController.update')
  router.delete('/:id', 'RecipesController.delete')
})
.prefix('/recipes')