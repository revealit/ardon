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

var router = function () {
  this.get(function () {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' });
    // TODO: This should provide a link to the API documentation, but
    // since we don't have one yet, just provide a friendly message.
    this.res.end('This is the entry point for the Ardon API.');
  });

  this.path('/boards', require('./boards').router);
};

module.exports = {
  router: router
};

