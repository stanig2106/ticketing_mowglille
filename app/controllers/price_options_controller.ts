import type { HttpContext } from '@adonisjs/core/http';

import PriceOption from '#models/price_option';
import Association from '#models/association';

export default class PriceOptionsController {
  async store({ request, response }: HttpContext) {
    const pricePackId = request.body().pricePackId;
    const associationId = request.body().associationId;
    //await Association.find(associationId).catch(() =>
      //response.notFound({ message: 'Association not found' })
    //);
    //TODO add PricePack check

    return PriceOption.create(request.body());
  }

  async destroy({ params }: HttpContext) {
    const priceOption = await PriceOption.findOrFail(params.id);
    await priceOption.delete();
    return { message: 'PriceOption deleted' };
  }
}
