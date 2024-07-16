import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare claInfoId: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column()
  declare role: string;

  static accessTokens = DbAccessTokensProvider.forModel(User);
}
