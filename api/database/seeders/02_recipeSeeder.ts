import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { RecipeSeederFactory } from '../../app/factories/recipeSeederFactory.js'
import db from '@adonisjs/lucid/services/db'

export default class RecipeSeeder extends BaseSeeder {
  async run() {
    await db.from('recipes').delete()
    await RecipeSeederFactory.createMany(10)
  }
}