import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Ingredient from './ingredient.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @manyToMany(() => Ingredient, {
    pivotTable: 'recipe_ingredient',
    pivotForeignKey: 'recipe_id',
    pivotRelatedForeignKey: 'ingredient_id',
    pivotColumns: ['quantity', 'unit'],
    pivotTimestamps: true
  })
  declare ingredients: ManyToMany<typeof Ingredient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}