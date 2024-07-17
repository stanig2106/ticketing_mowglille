import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class PriceOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare price: number;

  @column()
  declare pricePackId: number;

  @column()
  declare associationId: number;
}
