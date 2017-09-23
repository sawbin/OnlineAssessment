#!C:\Perl64\bin\perl.exe

use strict;
use warnings;
use CGI;
use DBI;
use JSON;

print "Content-type: text/html \n\n";

my $driver="SQLite";
my $database="assessment.db";
my $dsn="DBI:$driver:dbname=$database";
my $userid="";
my $password="";

#database connection
my $db_connection = DBI -> connect($dsn,$userid,$password,{RaiseError=>1}) 
	or die $DBI::errstr;

#print "Database Connection successful";
my $cgi = new CGI;

#get form parameters from the form
my $date = $cgi->param('date');
my $time = $cgi->param('time');
my $description = $cgi->param('description');

my @array_data = ($date, $time, $description);
# create table appointment inside assessment.db with required columns
my $sql_create = "CREATE TABLE IF NOT EXISTS appointment (date DATE, time VARCHAR(255), description VARCHAR(255))";
$db_connection->do($sql_create);

# insert data into database in different column date, time and description
my $insert_data= $db_connection -> prepare("INSERT INTO appointment(date, time, description) VALUES (?,?,?);");
$insert_data->execute($date, $time, $description) or die $DBI::errstr;

if($insert_data){	
	print to_json(\@array_data);
}

# disconnect to database
$db_connection->disconnect();