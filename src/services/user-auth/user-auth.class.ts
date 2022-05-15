import { Params } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { AuthenticationService } from '@feathersjs/authentication'
import bcrypt from 'bcrypt'
import { NotAuthenticated, NotFound } from '@feathersjs/errors'
import speakeasy from '@levminer/speakeasy'
import z from 'zod'

const authData = z.object({
  strategy: z.string().default('jwt'),
  email: z.string().email({ message: 'Invalid email address' }),
  userName: z
    .string()
    .max(20, 'username cannot be longer than 20 characters')
    .and(z.string().regex(/^[a-zA-Z\d]+$/)),
  totp: z
    .string()
    .regex(/^\d+$/, 'Invalid TOTP')
    .and(
      z.string().length(6, 'Invalid TOTP length, expected exactly 6 digits')
    )
})


type AuthData = z.infer<typeof authData>

// interface ServiceOptions {}

export class UserAuth extends AuthenticationService {
  app: Application
  options: {}

  constructor(options: {}, app: Application) {
    super(app)
    this.options = options
    this.app = app
  }

  async create(data: AuthData, params?: Params): Promise<AuthData> {
    authData.parse(data)

    const user = await this.app.service('users')._find({
      query: {
        userName: data.userName
      }
    })

    if (user.total===0) {
      throw new NotFound('User not found')
    }

    const isHashMatch = bcrypt.compareSync(data.email, user.data[0].email)

    if (!isHashMatch) {
      throw new NotFound('Wrong email, please try again')
    }

    const isAuthenticated = speakeasy.totp.verify({
      secret: user.data[0].secret,
      token: data.totp,
      window: 1
    })

    if (!isAuthenticated) {
      throw new NotAuthenticated('Wrong otp, please try again!')
    }
    const accessToken = await super.createAccessToken({
      id: user.data[0].id,
      username: user.data[0].userName,
      displayName: user.data[0].displayName
    })
    // @ts-ignore
    return await super.create(
      {
        strategy: 'jwt',
        accessToken
      },
      params as Params
    )
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
