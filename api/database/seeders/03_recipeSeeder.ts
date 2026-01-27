import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { RecipeSeederFactory } from '../../app/factories/recipeSeederFactory.js'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'

export default class RecipeSeeder extends BaseSeeder {
  async run() {
    await db.from('recipes').delete()
    
    const users = await User.query()
    
    for (const user of users) {
      await RecipeSeederFactory.createMany(5, user.id)
    }
  }
}