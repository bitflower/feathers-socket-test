/// <reference types="mocha"/>
import assert from 'assert';
import app from '../../src/app';

describe('\'atoms\' service', () => {
  it('registered the service', () => {
    const service = app.service('atoms');

    assert.ok(service, 'Registered the service');
  });
});
