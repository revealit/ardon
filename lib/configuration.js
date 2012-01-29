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

var app = require('flatiron').app,
    path = require('path'),
    nconf = require('nconf');

// Command-line arguments and environment settings take precedence.
nconf.argv();
nconf.env();

// Load from config-file, if it exists.
nconf.file({ file: path.join(__dirname, '..', 'config.json') });

// Provide some sane defaults if some options are not set.
nconf.defaults({
  database: {
    backend: 'postgresql'
  },
  http: {
    server: {
      port: 7000
    }
  }
});

// Set the configuration on the app object.
app.configuration = module.exports = nconf;

