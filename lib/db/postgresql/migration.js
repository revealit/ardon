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
    app = require('flatiron').app,
    async = require('async'),
    format = require('util').format,
    fs = require('fs'),
    path = require('path');

// Important: all migration files must match this pattern.
var migrationFileNamePattern = /^\d{4,}\-[a-z_\-]+\.sql$/;

var Migration = module.exports = function (options) {
  var self = this;

  self.construct = function () {
    self.configuration = options.configuration;

    return self;
  };

  // Get list of files in migrations folder.
  self.getFileList = function (callback) {
    fs.readdir(path.join(__dirname, 'migrations'), callback);
  };

  // Filter out files that do not match migrationFileNamePattern.
  self.filterFileNames = function (fileNames, callback) {
    fileNames = _.filter(fileNames, function (name) {
      return migrationFileNamePattern.test(name);
    });

    callback(null, fileNames);
  };

  // Sort the migrations by their number prefix.
  self.sortFileNames = function (fileNames, callback) {
    fileNames = _.sortBy(fileNames, function (name) {
      var migrationNumber = name.split('-')[0];

      return parseInt(migrationNumber, 10);
    });

    callback(null, fileNames);
  };

  // A curried version of fs.readFile that always reads as UTF-8. It
  // is thus usable as iterator for async.mapSeries or similar.
  self.readFile = function (fileName, callback) {
    fs.readFile(path.join(__dirname, 'migrations', fileName), 'UTF-8', callback);
  };

  // Load each filename given.
  self.loadFileContents = function (fileNames, callback) {
    async.mapSeries(fileNames, self.readFile, callback);
  };

  // Run the SQL commands in each file, in order.
  self.runSQL = function (fileNames, callback) {
    var spawn = require('child_process').spawn;

    async.forEachSeries(fileNames, function (name, callback) {
      var args = [
        '-d', self.configuration.get('database:name'),
        '-f', path.join(__dirname, 'migrations', name),
        '-h', self.configuration.get('database:host'),
        '-p', self.configuration.get('database:port'),
        '-U', self.configuration.get('database:user'),
        '-q1' // quiet, wrap in transaction.
      ];

      console.log("Running psql " + args.join(' '));

      var psql = spawn('psql', args);

      // Send the password via stdin.
      psql.stdin.write(self.configuration.get('database:password') + "\n");

      psql.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });

      psql.on('exit', function (code) {
        if (code !== 0) {
          callback('child process exited with code ' + code);
        }
      });

      self.configuration.get('database:password');
    }, callback);

  };


  // Start the migration process.
  // Runs the above functions in order to get the migration done.
  self.startMigration = function (callback) {
    // Let async do the flow control (even though this isn't all that
    // asyncronous, since it has to be in order).
    async.waterfall([
      self.getFileList,
      self.filterFileNames,
      self.sortFileNames,
      // Currently disabled, since we shell out to psql.
      //self.loadFileContents,
      self.runSQL
    ], callback);
  };

  return self.construct();
};


