import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { UserSeederFactory } from "../../app/factories/userSeederFactory.js";

export default class UserSeeder extends BaseSeeder {
    async run() {
        await db.from('users').delete()
        await UserSeederFactory.createMany(10)
        await UserSeederFactory.create({ fullName: 'Rémi', email: 'remi@gmail.com', password: '1234' })
    }
}