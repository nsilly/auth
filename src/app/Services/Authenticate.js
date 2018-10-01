import _ from 'lodash';
import models from '../../../../../../../dist/models';
import { UnauthorizedHttpException, Exception } from '@nsilly/exceptions';

export class Authenticate {
  async login(data) {
    this.decoded = data;
    this.isAuthenticated = true;
  }

  /**
   * Get current logged in user
   *
   * @return object
   */
  async getUser() {
    if (_.isUndefined(models)) {
      throw new Exception('Method is not implemented');
    }
    if (!this.isAuthenticated) {
      throw new UnauthorizedHttpException('Unauthorized');
    }
    if (_.isUndefined(process.domain._req.locals)) {
      process.domain._req.locals = {};
    }

    if (_.isUndefined(process.domain._req.locals.user)) {
      const user = await models.user.findOne({ where: { email: this.decoded.email }, include: [{ model: models.role }] });
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
