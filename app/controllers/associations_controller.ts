import type { HttpContext } from '@adonisjs/core/http';

import Association from '#models/association';

export default class AssociationsController {
  async index() {
    return Association.all();
  }

  async show({ params }: HttpContext) {
    return Association.findOrFail(params.id);
  }

  async store({ request }: HttpContext) {
    return Association.create(request.body());
  }

  async update({ params, request }: HttpContext) {
    const association = await Association.findOrFail(params.id);
    association.merge(request.body());
    await association.save();
    return association;
  }

  async destroy({ params }: HttpContext) {
    const association = await Association.findOrFail(params.id);
    await association.delete();
    return { message: 'Association deleted' };
  }
}
