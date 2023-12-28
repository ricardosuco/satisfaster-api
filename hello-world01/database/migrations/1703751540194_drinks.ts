import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drinks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.text('instructions', 'longtext').notNullable()
      table.text('image', 'longtext')
      table
        .enu('category', [
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
        ])
        .notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
