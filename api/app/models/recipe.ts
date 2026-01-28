import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import Ingredient from './ingredient.js'
import type { BelongsTo, ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import RecipeStep from './recipeStep.js'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare userId: number
  
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Ingredient, {
    pivotTable: 'recipe_ingredient',
    pivotForeignKey: 'recipe_id',
    pivotRelatedForeignKey: 'ingredient_id',
    pivotColumns: ['quantity', 'unit'],
    pivotTimestamps: true
  })
  declare ingredients: ManyToMany<typeof Ingredient>

  @hasMany(() => RecipeStep)
  declare steps: HasMany<typeof RecipeStep>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}