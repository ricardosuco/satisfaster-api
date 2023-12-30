import Drink from 'App/Models/Drink'
import { IDrink } from 'models/models'

export default interface DrinkRepositoryInterface {
  getAll(options: object, pagination?: object): Promise<Drink[]>
  getById(id: number): Promise<Drink>
  create(drink: IDrink): Promise<Drink>
  update(id: number, drink: IDrink): Promise<Drink>
  remove(id: number): Promise<void>
}
