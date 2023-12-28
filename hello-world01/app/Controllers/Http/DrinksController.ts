import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drink from 'App/Models/Drink'
import { StoreValidator, UpdateValidator } from 'App/Validators'

export default class DrinksController {
  public async index({ request }: HttpContextContract) {
    const { name, category } = request.qs()
    
    const drinkList = Drink.query()
    if (category) drinkList.where('category', category)
    if (name) drinkList.where('name', 'ilike', `%${name}%`)

    return await drinkList
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(StoreValidator)
    const drink = request.only(['name', 'instructions', 'image', 'category'])
    return await Drink.create(drink)
  }

  public async show({ params }: HttpContextContract) {
    return await Drink.findOrFail(params.id)
  }

  public async update({ request, params }: HttpContextContract) {
    await request.validate(UpdateValidator)
    const drink = await Drink.findOrFail(params.id)
    const data = request.only(['name', 'instructions', 'image', 'category'])

    drink.merge(data)
    return await drink.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const drink = await Drink.findOrFail(params.id)
    return await drink.delete()
  }
}
