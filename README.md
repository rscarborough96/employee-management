# employee-management
A web app that allows users to create, read, update, and delete employees from a mysql database

## Setup Notes
This project was created and tested on Ubuntu 20.04, and these other technologies:

### Database
MySQL version 8.0.28
This setup assumes a MySQL database is installed. Running the setup_db.sql file should provide the same database environment that I used.

### Web Server
Apache2 2.4.41 using libapache2-mod-php7.2

NOTE - Routing did not work out of the box, so to get it working I needed to:
1. Set AllowOverride to All in apache2.conf
2. Run sudo a2enmod rewrite
