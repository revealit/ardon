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

var flatiron = require('flatiron'),
    app = flatiron.app;

module.exports.start = function (portNumber, callback) {
  app.use(flatiron.plugins.http);

  app.router.configure({
    notfound: function (opts, callback) {
    console.log('pnoysovs');
      this.res.writeHead(200, { 'Content-Type': 'text/plain' });
      this.res.end("404 Not Found\n\nThe requested resource does not exist.");
    },
    strict: false
  });

  app.router.path('/api', require('./routes/api').router);

  app.router.get('/', require('./routes/index').page);

  app.start(portNumber, callback);
}

