import RecipeStep from '#models/recipeStep'

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

export class RecipeStepSeederFactory {
  public static async createMany(count: number, recipeId: number) {
    const steps = []
    for (let i = 1; i <= count; i++) {
      const description = stepDescriptions[Math.floor(Math.random() * stepDescriptions.length)]
      const duration = Math.random() > 0.5 ? Math.floor(Math.random() * 60) + 5 : null

      const step = await RecipeStep.create({
        recipeId,
        stepNumber: i,
        description: `Étape ${i}: ${description}`,
        durationMinutes: duration
      })

      steps.push(step)
    }
    return steps
  }

  public static async create(recipeId: number, stepNumber: number) {
    const description = stepDescriptions[Math.floor(Math.random() * stepDescriptions.length)]
    const duration = Math.random() > 0.5 ? Math.floor(Math.random() * 60) + 5 : null

    return RecipeStep.create({
      recipeId,
      stepNumber,
      description: `Étape ${stepNumber}: ${description}`,
      durationMinutes: duration
    })
  }
}
