import { Sequelize } from 'sequelize';
import { Application } from './declarations';

export default function (app: Application): void {
  const host = app.get('pg_host')
  const db = app.get('pg_database')
  const port = app.get('pg_port')
  const username = app.get('pg_username')
  const password = app.get('pg_password')

  const sequelize = new Sequelize(db, username, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    },
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
}
