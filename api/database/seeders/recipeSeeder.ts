import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { RecipeSeederFactory } from '../../app/factories/recipeSeederFactory.js'

export default class RecipeSeeder extends BaseSeeder {
  async run() {
    await RecipeSeederFactory.createMany(10)
  }
}