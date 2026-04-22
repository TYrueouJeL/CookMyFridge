import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Recipe from '#models/recipe'
import RecipeStep from '#models/recipeStep'

export default class RecipeStepSeeder extends BaseSeeder {
  async run() {
    await RecipeStep.query().delete()

    const recipes = await Recipe.all()

    const stepDescriptions = [
      'Préparez tous les ingrédients',
      'Chauffez le four ou le cuiseur',
      'Mélangez les ingrédients secs',
      'Combinez les ingrédients humides',
      'Versez le mélange dans le plat',
      'Cuisson à feu moyen',
      'Laissez reposer',
      'Servez chaud',
      'Garnissez avec les herbes fraîches'
    ]

    for (const recipe of recipes) {
      const stepsCount = Math.floor(Math.random() * 4) + 2 // 2-5 steps

      for (let i = 1; i <= stepsCount; i++) {
        const description = stepDescriptions[Math.floor(Math.random() * stepDescriptions.length)]
        const duration = Math.random() > 0.5 ? Math.floor(Math.random() * 60) + 5 : null

        await RecipeStep.create({
          recipeId: recipe.id,
          stepNumber: i,
          description: `Étape ${i}: ${description}`,
          durationMinutes: duration
        })
      }
    }
  }
}
