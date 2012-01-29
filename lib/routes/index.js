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

var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    indexPage;

var monolith = require('monolith').init({
  minify: true
});

var generatePage = function () {
  var rootPath = path.join(__dirname, '..', '..'),
      templateFile = path.join(rootPath, 'templates', 'page.tmpl.html'),
      pageTemplate = _.template(fs.readFileSync(templateFile, 'utf-8')),
      clientPath = path.normalize(path.join(rootPath, 'client'));

  // Add JavaScript dependencies.
  monolith.addScriptFile(path.join(clientPath, "static", "js", "jquery-1.7.1.js"));
  monolith.addScriptFile(require.resolve('underscore'));
  monolith.addScriptFile(require.resolve('backbone'));

  // Add our own clientside JavaScript.
  monolith.addScriptFile(path.join(clientPath, "core.js"));
  monolith.addScriptFile(path.join(clientPath, "models.js"));
  monolith.addScriptFile(path.join(clientPath, "collections.js"));
  monolith.addScriptFile(path.join(clientPath, "views.js"));

  var context = {
    content: fs.readFileSync(path.join(rootPath, 'templates', 'main.tmpl.html')),
    css: monolith.getCSS(),
    script: monolith.getScript(),
  };

  return pageTemplate(context);
};

// Function to generate the main page, containing everything we need for
// the app’s functionality.
var page = module.exports.page = function () {
  // Generate the indexPage markup the first time its requested.
  if (!indexPage) {
    indexPage = generatePage();
  }

  this.res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  this.res.end(indexPage);
};

