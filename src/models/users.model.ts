// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
import { Application } from '../declarations'

export default function (app: Application): any {
  const models = app.get('models')
  const users = models.loadSchema('users', {
    table_name: 'users',
    fields: {
      id: 'int',

      email: 'text',
      password: {
        type: 'text',
        rule: {
          required: true
        }
      }

    },
    key: ['id'],
    custom_indexes: [
      {
        on: 'email',
        using: 'org.apache.cassandra.index.sasi.SASIIndex',
        options: {}
      },
      {
        on: 'password',
        using: 'org.apache.cassandra.index.sasi.SASIIndex',
        options: {}
      }
    ],
    options: {
      timestamps: true
    }
  }, function (err: any) {
    if (err) throw err
  })

  users.syncDB(function (err: any) {
    if (err) throw err
  })

  return users
}
