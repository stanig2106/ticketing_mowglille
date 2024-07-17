import type { HttpContext } from '@adonisjs/core/http';

import PricePack from '#models/price_pack';

export default class PricePacksController {
  async index() {
    return PricePack.all();
  }

  async store({ request }: HttpContext) {
    return PricePack.create(request.body());
  }

  async show({ params }: HttpContext) {
    const pricePack = await PricePack.query()
      .preload('options')
      .where('id', params.id)
      .firstOrFail();
    return pricePack;
  }
}
