import * as feathersAuthentication from '@feathersjs/authentication'
import * as local from '@feathersjs/authentication-local'
import { assignBase32Secret } from '../../hooks/assign-base32-secret'
import { hashEmails } from '../../hooks/hash-email'
import { generateAuthenticatorUri } from '../../hooks/generate-authenticator-uri'
import { generateQrCode } from '../../hooks/generate-qr-code'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks
const {
  hashPassword,
  protect
} = local.hooks

export default {
  before: {
    all: [],
    find: [/* authenticate('jwt') */],
    get: [authenticate('jwt')],
    create: [hashEmails(), assignBase32Secret()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      // protect('email', 'secret')
    ],
    find: [protect('email', 'secret')],
    get: [protect('email', 'secret')],
    create: [
      generateAuthenticatorUri(),
      generateQrCode(),
      protect('email', 'secret')],
    update: [protect('email', 'secret')],
    patch: [protect('email', 'secret')],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
