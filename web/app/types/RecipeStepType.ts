export type RecipeStepType = {
  id: number
  recipeId: number
  stepNumber: number
  description: string
  durationMinutes: number | null
  createdAt: string | null
  updatedAt: string | null
}
