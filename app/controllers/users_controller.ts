import type { HttpContext } from '@adonisjs/core/http';

import ClaInfo from '#models/cla_info';
import User from '#models/user';

export default class UsersController {
  async index() {
    return User.all();
  }

  async show({ params }: HttpContext) {
    return User.findOrFail(params.id);
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = await User.findOrFail(params.id);

    if (params.id != auth.user?.id && auth.user?.role == User.roles.admin)
      response.forbidden("Can't change other user's info");

    if (
      request.body().role &&
      user.role !== request.body().role &&
      auth.user?.role !== User.roles.superAdmin
    ) {
      response.forbidden(
        "Can't change user's role unless you are a super admin"
      );
    }
    user.merge(request.body());
    await user.save();
    return user;
  }

  async cla({ request }: HttpContext) {
    if (!request.input('ticket')) {
      return 'No ticket provided';
    }

    const ticket = request.input('ticket');
    const fetchUrl =
      'https://centralelilleassos.fr/authentification/billetterie/' + ticket;
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      return response.statusText;
    }

    const responseJson = (await response.json()) as { payload: ClaInfo };
    const userInfos = responseJson.payload;
    const claInfo = await ClaInfo.firstOrCreate(
      { username: userInfos.username },
      userInfos
    );

    // prettier-ignore
    const user = (await User.query().whereHas('claInfo',
      (query) => query.where('id', claInfo.id)
    ).first()) || (await (async () => {
      const res = new User()
      await res.related('claInfo').associate(claInfo)
      await res.save()
      return res
    })())

    const token = await User.accessTokens.create(user);
    return { token: token.value!.release() };
  }
}
