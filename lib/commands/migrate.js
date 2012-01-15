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

var Ardon = require('../..');

var migrate = module.exports = function runserver (callback) {
  console.log('Starting migration.');
  Ardon.db.migrate(function (err, result) {
    if (!err) {
      console.log('Migration complete.');
    }

    callback(err);
  });
};

migrate.usage = "Runs database migrations";


