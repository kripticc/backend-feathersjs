// Initializes the `user-auth` service on path `/user-auth`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { UserAuth } from './user-auth.class'
import hooks from './user-auth.hooks'
import { JWTStrategy } from '@feathersjs/authentication'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'user-auth': UserAuth & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    // paginate: app.get("paginate"),
  }

  // Initialize our service with any options it requires
  app.use('/user-auth', new UserAuth(options, app))

  // Get our initialized service so that we can register hooks
  const authService = app.service('user-auth')

  // const authService = new AuthenticationService(app);

  authService.register('jwt', new JWTStrategy())
  authService.hooks(hooks)
}
