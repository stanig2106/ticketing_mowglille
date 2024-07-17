import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import PricePack from '#models/price_pack';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import PriceOptionVariant from '#models/price_option_variant';

export default class PriceOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare price: number;
  @column()
  declare quantity: number | null;
  @column()
  declare showQuantity: boolean;

  @belongsTo(() => PricePack)
  declare pricePack: BelongsTo<typeof PricePack>;

  @hasOne(() => PriceOptionVariant)
  declare variant: HasOne<typeof PriceOptionVariant>;
}
