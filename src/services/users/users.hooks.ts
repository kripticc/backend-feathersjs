import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import { assignSecret } from "../../hooks/assign-secret";
import { hashEmails } from "../../hooks/hash-email";
import { generateAuthenticatorUri } from "../../hooks/generate-authenticator-uri";
import { generateQrCode } from "../../hooks/generate-qr-code";
import validateData from "../../hooks/validate-data";
import { userSchema } from "./users.schema";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const {
  protect
} = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [validateData(userSchema), hashEmails(), assignSecret()],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      // protect('email', 'secret')
    ],
    find: [protect("email", "secret", "updatedAt")],
    get: [protect("email", "secret", "updatedAt")],
    create: [
      generateAuthenticatorUri(),
      generateQrCode(),
      protect("email", "secret", "updatedAt")],
    update: [protect("email", "secret", "updatedAt")],
    patch: [protect("email", "secret", "updatedAt")],
    remove: [protect("email", "secret", "updatedAt")]
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
};
