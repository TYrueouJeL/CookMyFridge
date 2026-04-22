import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Recipe from './recipe.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RecipeStep extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare recipeId: number

  @column()
  declare stepNumber: number

  @column()
  declare description: string

  @column()
  declare durationMinutes: number | null

  @belongsTo(() => Recipe)
  declare recipe: BelongsTo<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
