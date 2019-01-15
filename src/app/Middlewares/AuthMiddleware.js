import { App } from '@nsilly/container';

export const AuthMiddleware = (req, res, next) => {
  return App.make('AuthGate').authenticate(App.make('AuthStrategy').sign(), { session: false })(req, res, next);
};
