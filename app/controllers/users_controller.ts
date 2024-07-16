import type { HttpContext } from "@adonisjs/core/http";
import Cla_info from "#models/cla_info";
import User from "#models/user";

export default class UsersController {
  async cla(ctx: HttpContext) {
    //TODO: implement validator

    const ticket = ctx.request.input('ticket')
    const fetchUrl = 'https://centralelilleassos.fr/authentification/billetterie/' + ticket
    const response = await fetch(fetchUrl)

    if (!response.ok) {
      return response.statusText
    }

    const responseJson = await response.json() as JSON
    const userinfos = responseJson['payload']
    console.log(userinfos)
    const claInfo = await Cla_info.firstOrCreate(
      { username: userinfos['username'] },
      {
        username: userinfos['username'],
        first_name: userinfos['firstName'],
        last_name: userinfos['lastName'],
        school_email: userinfos['emailSchool'],
        cursus: userinfos['cursus'],
        promo: userinfos['promo'],
      }
    )
    const user = await User.firstOrCreate({ cla_info_id: claInfo.id }, { cla_info_id: claInfo.id })
    const token = await User.accessTokens.create(user)
    return { token: token.value!.release() }
  }
}
