/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const UsersController = () => import('#controllers/users_controller');

router.get('/', async () => {
  return {
    hello: 'oeoe'
  };
});

//User routes
router.post('users', [UsersController, 'store']);
router.get('users', [UsersController, 'index']).use([middleware.auth()]);
router.get('users/:id', [UsersController, 'show']).use([middleware.auth()]);
router.put('users/:id', [UsersController, 'update']).use([middleware.auth()]);
router
  .delete('users/:id', [UsersController, 'destroy'])
  .use([middleware.auth()]);
