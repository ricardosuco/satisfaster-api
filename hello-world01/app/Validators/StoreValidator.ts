import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255), rules.unique({ table: 'drinks', column: 'name' })]),
    instructions: schema.string({ trim: true }, [rules.maxLength(255)]),
    image: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    category: schema.enum([
      'Ordinary Drink',
      'Cocktail',
      'Milk / Float / Shake',
      'Other/Unknown',
      'Cocoa',
      'Shot',
      'Coffee / Tea',
      'Homemade Liqueur',
      'Punch / Party Drink',
      'Beer',
      'Soft Drink / Soda',
    ]),
  })

  public messages: CustomMessages = {}
}
