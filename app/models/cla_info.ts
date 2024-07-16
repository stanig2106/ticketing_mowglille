import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class ClaInfo extends BaseModel {
  @column({ isPrimary: true }) declare id: number;

  @column() declare username: string;

  @column() declare school_email: string;

  @column() declare first_name: string | null;

  @column() declare last_name: string | null;

  @column() declare cursus: string | null;

  @column() declare promo: string | null;
}
