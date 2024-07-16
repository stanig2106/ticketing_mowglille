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

  // Admin routes may be used later
  async admin({ params, auth, response }: HttpContext) {
    if (auth.user!.role != User.roles.superAdmin)
      return response.forbidden("You don't have the permission to do that");

    const user = await User.findOrFail(params.id);
    user.role = User.roles.admin;
    await user.save();
    return { message: 'User is now admin' };
  }

  async unadmin({ params, auth, response }: HttpContext) {
    if (auth.user?.role != User.roles.superAdmin)
      return response.forbidden("You don't have the permission to do that");
    const user = await User.findOrFail(params.id);
    user.role = User.roles.admin;
    await user.save();
    return { message: 'User is no longer admin' };
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

    const responseJson = (await response.json()) as Record<string, any>;
    const userInfos = responseJson['payload'];
    const claInfo = await ClaInfo.firstOrCreate(
      { username: userInfos['username'] },
      {
        first_name: userInfos['firstName'],
        last_name: userInfos['lastName'],
        school_email: userInfos['emailSchool'],
        cursus: userInfos['cursus'],
        promo: userInfos['promo']
      }
    );
    const user = await User.firstOrCreate({
      claInfoId: claInfo.id
    });
    const token = await User.accessTokens.create(user);
    return { token: token.value!.release() };
  }
}
