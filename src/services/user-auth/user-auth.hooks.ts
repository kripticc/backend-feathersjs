import validateData from "../../hooks/validate-data";
import { userAuthSchema } from "./user-auth.schema";
import { disallow } from "feathers-hooks-common";

export default {
  before: {
    all: [],
    find: [disallow()],
    get: [disallow()],
    create: [validateData(userAuthSchema)],
    update: [disallow()],
    patch: [disallow()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
};
