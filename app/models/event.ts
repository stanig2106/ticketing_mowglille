import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

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

  @column()
  declare pricePackId: number;

  @column()
  declare bannerUrl: string;
}
