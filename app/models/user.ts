import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import ClaInfo from '#models/cla_info';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @belongsTo(() => ClaInfo)
  declare claInfo: BelongsTo<typeof ClaInfo>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  static roles = {
    user: 0,
    admin: 1,
    superAdmin: 2
  };
  @column()
  declare role: (typeof User.roles)[keyof typeof User.roles];

  static accessTokens = DbAccessTokensProvider.forModel(User);
}
