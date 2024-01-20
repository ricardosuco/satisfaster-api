import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators'
import { inject } from '@adonisjs/core/build/standalone'
import DrinkRepositoryInterface from '@ioc:App/Repositories/DrinkRepository'
import { randomUUID } from 'node:crypto'
import { IDrink } from 'models/models'

@inject()
export default class DrinksController {
  constructor(private readonly drinkRepository: DrinkRepositoryInterface) {}
  public async index({ request, response }: HttpContextContract) {
    try {
      const { name, category, page, rowsPerPage } = request.qs()
      return this.drinkRepository.getAll({ name, category }, { page, rowsPerPage })
    } catch (error) {
      if (error?.status && error?.message) {
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(StoreValidator)
    try {
      const drink: IDrink = request.only(['name', 'instructions', 'category'])
      const image = request.file('image')
      if (image) {
        const imageName = `${randomUUID()}.${image.extname}`
        await image?.moveToDisk('images', { name: imageName }, 's3')
        drink.image = `${process.env.S3_BUCKET_URL}${imageName}`
      }
      await this.drinkRepository.create(drink)
      return response.created()
    } catch (error) {
      if (error?.status && error?.message) {
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      if (isNaN(Number(params.id))) {
        return response.status(400).send({ error: 'Invalid id' })
      }
      const drink = await this.drinkRepository.getById(params.id)
      return response.status(200).send(drink)
    } catch (error) {
      if (error?.status && error?.message) {
        if (error?.status === 404) return response.status(404).send({ error: 'Drink not found' })
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    if (isNaN(Number(params.id))) {
      return response.status(400).send({ error: 'Invalid id' })
    }
    await request.validate(UpdateValidator)
    try {
      const updatedDrink: IDrink = request.only(['name', 'instructions', 'image', 'category'])
      const drink = await this.drinkRepository.update(params.id, updatedDrink)
      return response.status(200).send(drink)
    } catch (error) {
      if (error?.status && error?.message) {
        if (error?.status === 404) return response.status(404).send({ error: 'Drink not found' })
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      if (isNaN(Number(params.id))) {
        return response.status(400).send({ error: 'Invalid id' })
      }
      await this.drinkRepository.remove(params.id)
      return response.status(200)
    } catch (error) {
      if (error?.status && error?.message) {
        if (error?.status === 404) return response.status(404).send({ error: 'Drink not found' })
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }
}
