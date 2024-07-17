import { DateTime } from 'luxon';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import PricePack from '#models/price_pack';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare urlId: string;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column.dateTime()
  declare startAt: DateTime;

  @column.dateTime()
  declare endAt: DateTime;

  @column.dateTime()
  declare ticketingStartAt: DateTime;

  @column()
  declare timeToPay: number;

  @hasOne(() => PricePack)
  declare pricePack: HasOne<typeof PricePack>;

  @column()
  declare bannerUrl: string;
}
