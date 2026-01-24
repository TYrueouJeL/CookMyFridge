import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Recipe from './recipe.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Recipe, {
    pivotTable: 'recipe_ingredient',
    pivotForeignKey: 'ingredient_id',
    pivotRelatedForeignKey: 'recipe_id'
  })
  declare ingredients: ManyToMany<typeof Recipe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}