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

// Construct the main Ardon object from its parts.
// The parts in the object literals do not require configuration, so
// they can be required directly with no fuss.
var Ardon = module.exports = {
  app: require('./lib/app'),
  configuration: require('./lib/configuration')
};

// The database needs the configuration to be loaded for correct
// initialisation of database connections, etc.
Ardon.db = require('./lib/db')(Ardon.configuration);

