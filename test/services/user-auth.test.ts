import assert from 'assert';
import app from '../../src/app';

describe('\'user-auth\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-auth');

    assert.ok(service, 'Registered the service');
  });
});
