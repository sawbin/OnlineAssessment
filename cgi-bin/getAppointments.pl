#!C:\Perl64\bin\perl.exe

use strict;
use warnings;
use CGI;
use DBI;
use JSON;

print "Content-type: text/json \n\n";

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
my $search_data = $cgi->param('search_data');

#check if the search_data is empty and execute sql query according to condition
my $sql_search= <STDIN>;
if($search_data){
	$sql_search=qq(SELECT date, time, description FROM appointment WHERE description LIKE '$search_data%');
}else{
	$sql_search=qq(SELECT date, time, description FROM appointment);
}

my $search_result = $db_connection->prepare($sql_search);

$search_result->execute() 
or die $DBI::errstr;

# assign hash reference data to output array
my @output;
while ( my $row = $search_result->fetchrow_hashref()){
    push @output, $row;
}

# Convert data to JSON format
print to_json(\@output);

$db_connection->disconnect();