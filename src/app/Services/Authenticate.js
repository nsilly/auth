import _ from 'lodash';
import { UnauthorizedHttpException, Exception } from '@nsilly/exceptions';
import httpContext from 'express-http-context';

export class Authenticate {
  constructor() {
    this.isAuthenticated = false;
  }

  async login(data) {
    this.decoded = data;
    this.isAuthenticated = true;
    httpContext.set('isAuthenticated', true);
  }

  setModel(model) {
    this.model = model;
  }

  /**
   * Get current logged in user
   *
   * @return object
   */
  async getUser() {
    if (_.isUndefined(this.model)) {
      throw new Exception('Method is not implemented');
    }
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }

    if (_.isNil(httpContext.get('user'))) {
      const user = await this.model.user.findOne({ where: { id: this.decoded.id }, include: [{ model: this.model.role }] });
      httpContext.set('user', user);
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
