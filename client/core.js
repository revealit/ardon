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

var Ardon = {
  templates: {}
};

Ardon.WorkspaceRouter = Backbone.Router.extend({
  routes: {
    '': 'boardList'
  },

  boardList: function () {
    var boards = new Ardon.Boards();

    boards.fetch({
      error: function (collection, response) {
      },
      success: function (collection, response) {
        var boardList = new Ardon.BoardListView({
          boards: boards
        });

        boardList.render();

        Ardon.mainView.content.html(boardList.el);
      }
    });
  }
});

Ardon.NotFoundRouter = Backbone.Router.extend({
  routes: {
    '*path': 'notFound'
  },

  notFound: function (path) {
    console.log('Page ' + path + ' was not found.');
  }
});

// Load templates from the page.
Ardon.compileTemplates = function () {
  $('script[type="text/template"]').each(function () {
    if (!Ardon.templates[this.id]) {
      Ardon.templates[this.id] = _.template(this.innerHTML);
    }
  });
};

// When the DOM is ready, start the routers.
jQuery(function($) {
  // Initialise our routers, last match wins, so the NotFoundRouter goes first.
  new Ardon.NotFoundRouter();
  new Ardon.WorkspaceRouter();

  // Find and compile all the templates on the page.
  Ardon.compileTemplates();

  // Render the main view and add it to the DOM.
  Ardon.mainView = new Ardon.MainView();
  Ardon.mainView.id = 'ardon-main';
  Ardon.mainView.render();
  $('body').prepend(Ardon.mainView.el);

  Backbone.history.start();
});

