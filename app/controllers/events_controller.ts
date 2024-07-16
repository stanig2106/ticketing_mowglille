import type { HttpContext } from '@adonisjs/core/http';

import Event from '#models/event';

export default class EventsController {
  async index() {
    return Event.all();
  }

  async show({ params }: HttpContext) {
    return Event.findOrFail(params.id);
  }

  async store({ request }: HttpContext) {
    return Event.create(request.body());
  }

  async update({ params, request }: HttpContext) {
    const event = await Event.findOrFail(params.id);
    event.merge(request.body());
    await event.save();
    return event;
  }

  async destroy({ params }: HttpContext) {
    const event = await Event.findOrFail(params.id);
    await event.delete();
    return { message: 'Event deleted' };
  }
}
