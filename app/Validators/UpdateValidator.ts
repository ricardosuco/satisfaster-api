import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({ table: 'drinks', column: 'name' }),
    ]),
    instructions: schema.string({ trim: true }, [rules.maxLength(255)]),
    image: schema.file.optional({ extnames: ['png', 'jpg', 'jpeg'] }),
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
