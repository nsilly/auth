import { UnauthorizedHttpException } from '@nsilly/exceptions';
import httpContext from 'express-http-context';

export class Authenticate {
  login(user) {
    this.user = user;
    httpContext.set('user', user);
    this.isAuthenticated = true;
  }

  setModel(model) {
    this.model = model;
  }

  /**
   * Get current logged in user
   *
   * @return object
   */
  getUser() {
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }

    return httpContext.get('user');
  }

  getUserId() {
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }
    return this.decoded.id;
  }
}
