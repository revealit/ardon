/*!
 * Copyright 2012 Reveal IT.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
"use strict";

// HTTP port number used for the test server instance.
var TEST_PORT = 7357,
    SERVER = 'http://127.0.0.1:' + TEST_PORT;

var Ardon = require('..'),
    assert = require('assert'),
    request = require('request'),
    vows = require('vows');

vows.describe('Basic Ardon REST API').addBatch({
  'The API server': {
    topic: function () {
      var topicCallback = this.callback;
      Ardon.app.start(TEST_PORT, function (err) {
        topicCallback(err, Ardon);
      });
    },
    'when GET’ing the /api root': {
      topic: function (Ardon) {
        request(SERVER + '/api', this.callback);
      },
      'should respond with HTTP 200 OK': function (error, response, body) {
        assert.equal(response.statusCode, 200);
      },
      'should respond with a welcome message': function (error, response, body) {
        assert.isTrue(body.length > 10);
      },
    },
    'when requesting list of public boards': {
      topic: function (Ardon) {
        request(SERVER + '/api/boards', this.callback);
      },
      'should not cause errors': function (error, response, body) {
        assert.isNull(error);
      },
      'should respond with HTTP 200 OK': function (error, response, body) {
        assert.equal(response.statusCode, 200);
      },
      'should respond with valid JSON array': function (error, response, body) {
        assert.isArray(JSON.parse(body));
      }
    },
    teardown: function (Ardon) {
      // Stop the server when we're done testing.
      Ardon.app.server.close();
    }
  }
}).export(module);

