import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255)]),
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
