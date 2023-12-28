import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Drink from 'App/Models/Drink'
import { drinkList } from '../../utils/drinks'
import { Drink as DrinkType } from '../../utils/types'
import { IDrink } from '../../models/models'

export default class extends BaseSeeder {
  public async run() {
    const drinkDump = drinkList.map((drink: DrinkType) => {
      return {
        name: drink.strDrink,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb,
        category: drink.strCategory,
      }
    }) as IDrink[]

    await Drink.createMany(drinkDump)
    // Write your database queries inside the run method
  }
}
