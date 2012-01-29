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
    var dbClient = require('../../db').getClient(),
        res = this.res;

    dbClient.board.get({}, function (err, result) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    });
  });
};

module.exports = {
  router: router
};

