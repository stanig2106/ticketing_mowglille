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

const EventsController = () => import('#controllers/events_controller');
const AssociationsController = () =>
  import('#controllers/associations_controller');

const UsersController = () => import('#controllers/users_controller');

router.get('/', async () => {
  return {
    hello: 'oeoe'
  };
});

router.get('cla', [UsersController, 'cla']);

//User routes
router.get('users', [UsersController, 'index']).use([middleware.auth()]);
router.get('users/:id', [UsersController, 'show']).use([middleware.auth()]);
router.put('users/:id', [UsersController, 'update']).use([middleware.auth()]);

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
  .delete('events/:id', [EventsController, 'destroy'])
  .use([middleware.auth(), middleware.admin()]);

//Association routes
router
  .post('associations/', [AssociationsController, 'store'])
  .use([middleware.auth(), middleware.admin()]);
router
  .get('associations/', [AssociationsController, 'index'])
  .use([middleware.auth()]);
router
  .get('associations/:id', [AssociationsController, 'show'])
  .use([middleware.auth()]);
router
  .put('associations/:id', [AssociationsController, 'update'])
  .use([middleware.auth(), middleware.admin()]);
router
  .delete('associations/:id', [AssociationsController, 'destroy'])
  .use([middleware.auth(), middleware.admin()]);
