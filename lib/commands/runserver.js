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

var runserver = module.exports = function runserver () {

  var portNumber = Ardon.configuration.get('http:server:port');

  Ardon.app.start(portNumber);
  Ardon.app.log.info('Server listening at port ' + portNumber);
};

runserver.usage = "Starts the Ardon web server";
