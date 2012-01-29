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

Ardon.BoardListView = Backbone.View.extend({
  initialize: function (options) {
    _.bindAll(this);

    this.boards = options.boards;

    this.boards.fetch();
  },

  render: function (options) {
    $(this.el).html(Ardon.templates['tmpl-board-list']({
      boards: this.boards
    }));

    return this;
  }
});

Ardon.MainView = Backbone.View.extend({
  initialize: function (options) {
    _.bindAll(this);
  },

  render: function (options) {
    $(this.el).html(Ardon.templates['tmpl-main']({}));

    this.content = $(this.el).find('#content');
  }
});

