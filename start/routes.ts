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
import EventsController from '#controllers/events_controller';

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

//Event routes
router
  .post('events', [EventsController, 'store'])
  .use([middleware.auth(), middleware.admin()]);
router.get('events', [EventsController, 'index']);
router.get('events/:id', [EventsController, 'show']);
router
  .put('events/:id', [EventsController, 'update'])
  .use([middleware.auth(), middleware.admin()]);
router
  .delete('events/:id', [EventsController, 'destroy'
  ])
  .use([middleware.auth(), middleware.admin()]);
