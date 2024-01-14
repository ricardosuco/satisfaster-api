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
    try {
      await request.validate(StoreValidator)
      const drink: IDrink = request.only(['name', 'instructions', 'category'])
      const image = request.file('image')
      if (image) {
        const imageName = `${randomUUID()}.${image.extname}`
        await image?.moveToDisk('images', { name: imageName }, 's3')
        drink.image = `${process.env.S3_BUCKET_URL}${imageName}`
      }
      return this.drinkRepository.create(drink)
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
      return this.drinkRepository.getById(params.id)
    } catch (error) {
      if (error?.status && error?.message) {
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      if (isNaN(Number(params.id))) {
        return response.status(400).send({ error: 'Invalid id' })
      }
      await request.validate(UpdateValidator)
      const updatedDrink: IDrink = request.only(['name', 'instructions', 'image', 'category'])
      return this.drinkRepository.update(params.id, updatedDrink)
    } catch (error) {
      if (error?.status && error?.message) {
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
      return await this.drinkRepository.remove(params.id)
    } catch (error) {
      if (error?.status && error?.message) {
        return response.status(error?.status).send({ error: error.message.toString() })
      } else {
        return response.status(500).send({ error: 'Internal server error' })
      }
    }
  }
}
