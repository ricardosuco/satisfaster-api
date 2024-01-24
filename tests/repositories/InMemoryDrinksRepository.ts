import Drink from 'App/Models/Drink'
import { IDrink } from 'models/models'
import DrinkRepositoryInterface from 'App/Repositories/Interfaces/DrinkRepositoryInterface'
import { DateTime } from 'luxon'

export class InMemoryDrinksRepository implements DrinkRepositoryInterface {
  private drinks: IDrink[] = []

  public async getAll(options: object): Promise<Drink[]> {
    return this.drinks.map((drink) => this.toDrink(drink))
  }

  public async getById(id: number): Promise<Drink> {
    const drink = await this.drinks.find((drink) => drink.id === id)
    if (!drink) throw new Error(JSON.stringify({ status: 404, message: 'Drink not found' }))
    return this.toDrink(drink)
  }

  public async create(drink: IDrink): Promise<Drink> {
    if (this.drinks.find((d) => d.name === drink.name)) {
      throw new Error(JSON.stringify({ status: 400, message: 'Name must be unique' }))
    }
    const newDrink = {
      id: this.drinks.length + 1,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      ...drink,
    } as IDrink
    this.drinks.push(newDrink)
    return this.toDrink(drink)
  }

  public async update(id: number, updatedDrink: IDrink): Promise<Drink> {
    const index = this.drinks.findIndex((drink) => drink.id === id)
    if (index !== -1) {
      this.drinks[index] = updatedDrink
      return this.toDrink(this.drinks[index])
    } else throw new Error(JSON.stringify({ status: 404, message: 'Drink not found' }))
  }

  public async remove(id: number): Promise<void> {
    const index = this.drinks.findIndex((drink) => drink.id === id)
    if (index !== -1) {
      this.drinks.splice(index, 1)
      return
    } else throw new Error(JSON.stringify({ status: 404, message: 'Drink not found' }))
  }

  private toDrink(drink: IDrink): Drink {
    return {
      id: drink.id as number,
      name: drink.name,
      instructions: drink.instructions,
      image: drink.image as string,
      category: drink.category,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
  }
}
