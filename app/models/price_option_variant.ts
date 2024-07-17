import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import PriceOption from '#models/price_option';

export default class PriceOptionVariant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare newPrice: number;

  @belongsTo(() => PriceOption)
  declare pricePack: BelongsTo<typeof PriceOption>;
}
