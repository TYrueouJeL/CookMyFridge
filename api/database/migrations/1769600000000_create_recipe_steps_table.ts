import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipe_steps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('recipe_id').notNullable().unsigned()
      table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE')
      
      table.integer('step_number').notNullable()
      
      table.text('description').notNullable()
      
      table.integer('duration_minutes').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      
      table.unique(['recipe_id', 'step_number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
