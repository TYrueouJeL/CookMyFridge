import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { IngredientSeederFactory } from '../../app/factories/ingredientSeederFactory.js'

export default class IngredientSeeder extends BaseSeeder {
  async run() {
    await IngredientSeederFactory.createMany(20)
  }
}