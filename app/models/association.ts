import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Association extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare logoUrl: string;

  @column()
  declare color: string;

  @column()
  declare sold: number;
}
