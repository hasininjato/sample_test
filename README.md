# About the project

This is the repository for the test project from L3M Holding. It uses ExpressJS for backend, PostgreSQL as database management system and VueJS for frontend.


# Build the project

First rename .env.example to .env

Fill values for Postgres connection (user, password, database name).

The script inside Docker/db/init-db.sh creates database, user and configure all privileges.

We use nginx to easily manage running containers. Its configuration file is inside Docker/vhosts/nginx.local.conf.

To build the project, run the command `./commands/docker-build.bat`

To start the project, run the command `./commands/docker-start.bat`

To execute the running container, run the command `./command/docker-exec.bat`