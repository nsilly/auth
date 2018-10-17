import _ from 'lodash';
import { UnauthorizedHttpException, Exception } from '@nsilly/exceptions';

export class Authenticate {
  async login(data) {
    this.decoded = data;
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
  async getUser() {
    if (_.isUndefined(this.model)) {
      throw new Exception('Method is not implemented');
    }
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }
    if (_.isUndefined(process.domain._req.locals)) {
      process.domain._req.locals = {};
    }

    if (_.isUndefined(process.domain._req.locals.user)) {
      const user = await this.model.user.findOne({ where: { email: this.decoded.email }, include: [{ model: this.model.role }] });
      process.domain._req.locals.user = user;
    }

    return process.domain._req.locals.user;
  }

  getUserId() {
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }
    return this.decoded.id;
  }
}
