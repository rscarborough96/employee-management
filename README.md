# employee-management
A web app that allows users to create, read, update, and delete employees from a mysql database

Satisfies these user stories:\
1. As a user I can add an employee to the system.
2. As a user I will be notified when the user has been successfully saved.
3. As a user I can update an employee in the system.
4. As a user I will be notified when an employee is successfully updated
5. As a user I will remove an employee from the system.
6. As a user I will be notified when an employee is removed from the system.

These optional requirements are also satisfied:\
1. Perstancy across application restarts.
	* This implementation uses a MySQL database.
2. Written to be used on a mobile device.
	* Bootstrap was used to design a "mobile first" front end, ensuring a pleasant user experience on mobile devices.
3. Authentication for user access.
	* A "users" table was included in the database to enable authentication. (User details are in the setub_db.sql file)
4. Written to utilize the cloud.
	* The abstract factory pattern was used to create database connection objects. This can be utilized to easilly connect to cloud storage technologies.
	* An example class, CloudMysqlConnection, can be found in database_connection_factories.php. 

## Setup Notes
This project was created and tested on Ubuntu 20.04, and these other technologies:

### Database
MySQL version 8.0.28\
This setup assumes a MySQL database is installed. Running the setup_db.sql file should provide the same database environment that I used.

### Web Server
Apache2 2.4.41 using libapache2-mod-php7.4

NOTE - Routing did not work out of the box, so to get it working I needed to:
1. Set AllowOverride to All in apache2.conf
2. Run sudo a2enmod rewrite
