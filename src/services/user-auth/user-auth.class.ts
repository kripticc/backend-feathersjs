import { Params } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { AuthenticationService } from '@feathersjs/authentication'
import bcrypt from 'bcrypt'
import { NotAuthenticated, NotFound } from '@feathersjs/errors'
import speakeasy from '@levminer/speakeasy'

interface authData {
  strategy: string
  email: string
  userName: string
  totp: string
}

// interface ServiceOptions {}

export class UserAuth extends AuthenticationService {
  app: Application
  options: {}

  constructor(options: {}, app: Application) {
    super(app)
    this.options = options
    this.app = app
  }

  async create(data: authData, params?: Params): Promise<authData> {

    const user = await this.app.service('users')._find({
      query: {
        userName: data.userName
      }
    })

    if (user.total===0) {
      throw new NotFound('User not found')
    }

    const isHashMatch = bcrypt.compareSync(data.email, user.data[0].email)
    console.log(isHashMatch)

    if (!isHashMatch) {
      throw new NotFound('Wrong email, please try again')
    }

    console.log(user.data[0].secret)
    const isAuthenticated = speakeasy.totp.verify({
      secret: user.data[0].secret,
      token: data.totp,
      encoding: 'base32'
    })

    console.log(isAuthenticated)
    if (!isAuthenticated) {
      throw new NotAuthenticated('Wrong otp, please try again!')
    }
    const accessToken = await super.createAccessToken({
      id: user.data[0].id,
      username: user.data[0].userName,
      displayName: user.data[0].displayName
    })
    // @ts-ignore
    return await super.create({
      strategy: 'jwt',
      accessToken
    }, params as Params)
  }

  async getPayload(authResult: any, params: Params) {
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
