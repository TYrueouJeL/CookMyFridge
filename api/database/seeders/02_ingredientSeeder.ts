import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { IngredientSeederFactory } from '../../app/factories/ingredientSeederFactory.js'
import db from '@adonisjs/lucid/services/db'

export default class IngredientSeeder extends BaseSeeder {
  async run() {
    await db.from('ingredients').delete()
    await IngredientSeederFactory.createMany(20)
  }
}