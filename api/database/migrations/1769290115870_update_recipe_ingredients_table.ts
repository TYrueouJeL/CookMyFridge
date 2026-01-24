import { BaseSchema } from '@adonisjs/lucid/schema'
import { UnitEnum } from '../../app/enums/unitEnum.js'

export default class extends BaseSchema {
  protected tableName = 'recipe_ingredient'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('quantity').notNullable().defaultTo(1)
      table.string('unit').notNullable().defaultTo(UnitEnum.GRAM)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('quantity')
      table.dropColumn('unit')
    })
  }
}