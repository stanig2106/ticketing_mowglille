import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import PriceOption from '#models/price_option';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class PricePack extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare quantity: number;

  @hasMany(() => PriceOption)
  declare options: HasMany<typeof PriceOption>;
}
