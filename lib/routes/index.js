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

// Function to generate the main page, containing everything we need for
// the app’s functionality.
var page = module.exports.page = function () {
  this.res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  this.res.end('<h1>Hello Ardon</h1>');
};

