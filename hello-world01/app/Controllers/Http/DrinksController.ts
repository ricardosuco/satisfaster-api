import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators'
import { inject } from '@adonisjs/core/build/standalone'
import DrinkRepositoryInterface from '@ioc:App/Repositories/DrinkRepository'
import { randomUUID } from 'node:crypto'
import { IDrink } from 'models/models'

@inject()
export default class DrinksController {
  constructor(private readonly drinkRepository: DrinkRepositoryInterface) {}
  public async index({ request }: HttpContextContract) {
    const { name, category, page, rowsPerPage } = request.qs()

    return this.drinkRepository.getAll({ name, category }, { page, rowsPerPage })
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(StoreValidator)
    const drink: IDrink = request.only(['name', 'instructions', 'category'])
    const image = request.file('image')

    if (image) {
      const imageName = `${randomUUID()}.${image.extname}`
      await image?.moveToDisk(
        'images',
        {
          name: imageName,
        },
        's3'
      )

      drink.image = `${process.env.S3_BUCKET_URL}${imageName}`
    }

    return this.drinkRepository.create(drink)
  }

  public async show({ params }: HttpContextContract) {
    return this.drinkRepository.getById(params.id)
  }

  public async update({ request, params }: HttpContextContract) {
    await request.validate(UpdateValidator)
    const updatedDrink: IDrink = request.only(['name', 'instructions', 'image', 'category'])
    return this.drinkRepository.update(params.id, updatedDrink)
  }

  public async destroy({ params }: HttpContextContract) {
    return await this.drinkRepository.remove(params.id)
  }
}
