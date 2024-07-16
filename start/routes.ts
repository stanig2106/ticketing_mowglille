/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import Cla_info from "#models/cla_info";

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'oeoe',
  }
})

router.post('test', async ({ auth }) => {
  // Authenticate using the default guard
  const user = await auth.authenticate()
  return await Cla_info.find(user.cla_info_id)
})

router.get('cla', [UsersController, 'cla'])
