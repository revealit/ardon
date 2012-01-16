Ardon – a simple open source task board app
===========================================

Still very much a research project. Play around with it if you like, but
don't expect too much.


Development
-----------

When working with the [Ardon][] source code, you might want to use
[forever][] to automatically reload your Ardon source code whenever
it changes. Run this command from the root of the project:

    ./node_modules/.bin/forever -w start bin/ardon runserver


Configuration
-------------

Ardon requires a database for storing your data. At the very least, that
must be configured. 

As Ardon uses [nconf][] for configuration, you have the choice of using
either environment variables, command line options or a JSON
configuration file.

If you elect to use the configuration file, a `config.json.example` file
is present in this folder. Copy it to `config.json` and customise its
content to match your database settings.

### Database support ###

[PostgreSQL][] is currently the only supported database backend.


[Ardon]: https://github.com/revealit/ardon/
[forever]: https://github.com/nodejitsu/forever
[nconf]: https://github.com/flatiron/nconf
[PostgreSQL]: http://www.postgresql.org/

