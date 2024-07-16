import type { HttpContext } from '@adonisjs/core/http';
import ClaInfo from '#models/cla_info';
import User from '#models/user';

export default class UsersController {
  async cla({ request }: HttpContext) {
    if (!request.hasBody() || !request.input('ticket')) {
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
      cla_info_id: claInfo.id
    });
    const token = await User.accessTokens.create(user);
    return { token: token.value!.release() };
  }
}
