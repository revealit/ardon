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

var pg = require('pg').native;

var PostgresSQLBackend = function (configuration) {
  var self = this;

  self.construct = function () {
    self.configuration = configuration;

    return self;
  };

  // Set up database connection.
  self.connect = function (callback) {
    if (self.client) {
      return self;
    }

    pg.connect({
      user: self.configuration.get('database:user'),
      database: self.configuration.get('database:name'),
      password: self.configuration.get('database:password'),
      port: self.configuration.get('database:port'),
      host: self.configuration.get('database:host'),
    }, function(err, client) {
      if (err) {
        throw err;
      }

      self.client = client;

      callback(err, client);
    });

    return self;
  };

  // Drop the database connection.
  self.disconnect = function () {
    self.client.end();
    self.client = null;
  };

  // Run database migrations.
  self.migrate = function (callback, purge) {
    var Migration = require('./migration');

    self.migration = new Migration({
      configuration: self.configuration,
    });

    if (purge) {
      // Set the migrate option to true to have the database remigrated
      // after being purged.
      self.migration.purgeDatabase(callback, true);
    }
    else {
      self.migration.startMigration(callback);
    }
  };

  return self.construct();
};

module.exports = PostgresSQLBackend;

