import { Service } from 'feathers-cassandra'

export class Users extends Service {
  constructor (options) {
    const { Model, ...otherOptions } = options

    super({
      ...otherOptions,
      model: Model
    })
  }
}
