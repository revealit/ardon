-- Copyright 2012 Reveal IT.
--
-- Licensed under the Apache License, Version 2.0 (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0

-- WARNING: This is not a migration. Rather, this SQL script is supposed
-- to completely purge the database of any data or other objects created
-- by Ardon. Run this at your own peril.

DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS cards CASCADE;

