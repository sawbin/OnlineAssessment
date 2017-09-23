The project is done with following features

HTML
CSS
Bootstrap
Jquery
Perl
SQlite
JSON
WAMP- Apache Version : 2.4.9

Follow the following steps to run the project:
- Download the project
- Extract the project and copy the extracted file to www folder inside wamp
- Just run the wamp and and go to the project url

Requirement:
- Wamp should be configured to run the perl which is managed my configuring th http.conf file inside apache folder
	1- Modify below parameters
		Options Indexes FollowSymLinks Includes ExecCGI

	2- Modify and add below parameters
		- AddHandler cgi-script .cgi
		- AddHandler cgi-script .pl

	3- Change below setting
		DirectoryIndex index.php index.php3 index.html index.htm index.cgi index.pl
		
- To run Sqlite install Sqlite 3 which you can download from sqlite web page.