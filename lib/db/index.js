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

// This is really just a constructor that loads the appropriate
// database backend and initialises it.
module.exports = function (configuration) {
  // This will explode if the user has put an invalid value in
  // database:backend, but that should be OK for this situation.
  var Backend = require('./' + configuration.get('database:backend'));

  return new Backend(configuration);
};

