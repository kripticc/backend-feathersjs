import { NullableId, Params } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import {
  AuthenticationResult,
  AuthenticationService
} from '@feathersjs/authentication'

interface Data {
  email: string
  username: string
  displayName?: string
}

// interface ServiceOptions {}

export class UserAuth extends AuthenticationService {
  app: Application
  options: {}

  constructor (options: {}, app: Application) {
    super(app)
    this.options = options
    this.app = app
  }

  async create (data: Data, params?: Params): Promise<Data> {
    // if (Array.isArray(data)) {
    //   return await Promise.all(data.map(async (current) => await this.create(current, params)))
    // }

    // @ts-expect-error
    return await super.create(data, params as Params)
  }

  async getPayload (authResult: any, params: Params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params)
    const { user } = authResult

    if (user && user.permissions) {
      payload.permissions = user.permissions
    }

    return payload
  }

  // async remove(id: NullableId, params?: Params): Promise<Data> {
  //   return {
  //     displayName: "",
  //     email: "",
  //     username: "",
  //     id,
  //   };
  // }
}
