import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login';

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user;
    if (user?.role === 'user') {
      return ctx.response.forbidden('You are not allowed to access this route');
    }
    return next();
  }
}
