import { App } from '@nsilly/container';
import httpContext from 'express-http-context';

export class Auth {
  /**
   * Log a user into the application by email.
   *
   * @param string email
   * @return object
   */
  static async login(data) {
    return App.make('Auth').login(data);
  }

  /**
   * Determine the use is logged in
   *
   * @return bool
   */
  static check() {
    return httpContext.get('isAuthenticated');
  }

  /**
   * Get the currently authenticated user.
   *
   * @return object
   */
  static async user() {
    const user = await App.make('Auth').getUser();
    return user;
  }

  /**
   * Get the currently authenticated id.
   *
   * @return integer
   */
  static id() {
    return App.make('Auth').getUserId();
  }
}
