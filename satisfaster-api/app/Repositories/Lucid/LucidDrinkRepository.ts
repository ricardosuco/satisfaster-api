import Drink from 'App/Models/Drink'
import DrinkRepositoryInterface from '../Interfaces/DrinkRepositoryInterface'
import { IDrink } from 'models/models'

export default class LucidDrinkRepository implements DrinkRepositoryInterface {
  public async getAll(options, pagination): Promise<Drink[]> {
    const limit = pagination.rowsPerPage ? pagination.rowsPerPage : 10
    const page = pagination.page ? pagination.page : 1

    const drinkList = Drink.query()
    if (options.category) drinkList.where('category', options.category)
    if (options.name) drinkList.where('name', 'ilike', `%${options.name}%`)

    return await drinkList.paginate(page, limit)
  }

  public async getById(id: number): Promise<Drink> {
    return await Drink.findOrFail(id)
  }

  public async create(drink: IDrink): Promise<Drink> {
    return await Drink.create(drink)
  }

  public async update(id: number, drink: IDrink): Promise<Drink> {
    const foundDrink = await Drink.findOrFail(id)
    foundDrink.merge(drink)
    return await foundDrink.save()
  }

  public async remove(id: number): Promise<void> {
    const foundDrink = await Drink.findOrFail(id)
    await foundDrink.delete()
  }
}
