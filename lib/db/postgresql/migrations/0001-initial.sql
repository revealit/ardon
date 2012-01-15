-- Copyright 2012 Reveal IT.
--
-- Licensed under the Apache License, Version 2.0 (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0

CREATE TABLE boards (
    id serial PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE lists (
    id serial PRIMARY KEY,
    board_id int REFERENCES boards(id),
    name text NOT NULL,
    weight smallint NOT NULL DEFAULT 0
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    board_id int NOT NULL REFERENCES boards(id),
    list_id int NOT NULL REFERENCES lists(id),
    name text NOT NULL,
    description text,
    weight smallint NOT NULL DEFAULT 0
);


