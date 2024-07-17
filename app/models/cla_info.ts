import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class ClaInfo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column()
  declare schoolEmail: string;

  @column()
  declare firstName: string | null;

  @column()
  declare lastName: string | null;

  @column()
  declare cursus: string | null;

  @column()
  declare promo: string | null;
}
