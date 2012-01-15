Ardon – a simple open source task board app
===========================================

Still very much a research project. Play around with it if you like, but
don't expect too much.


Development
-----------

When working with the [Ardon][] source code, you might want to use
[supervisor][] to automatically reload your Ardon source code whenever
it changes:

    supervisor bin/ardon


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
[supervisor]: https://github.com/isaacs/node-supervisor
[nconf]: https://github.com/flatiron/nconf
[PostgreSQL]: http://www.postgresql.org/

