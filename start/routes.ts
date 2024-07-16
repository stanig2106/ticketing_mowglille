/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import ClaInfo from '#models/cla_info';

const UsersController = () => import('#controllers/users_controller');

router.get('/', async () => {
  return {
    hello: 'oeoe'
  };
});

router.post('test', async ({ auth }) => {
  // Authenticate using the default guard
  const user = await auth.authenticate();
  return await ClaInfo.find(user.cla_info_id);
});

router.get('cla', [UsersController, 'cla']);
