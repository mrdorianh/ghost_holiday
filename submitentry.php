<?php
$server = 'box5154.bluehost.com';
$port = 3306;
$dbName = 'XXX';
$username = 'XXX';
$password = 'XXX';

$FullName = $_GET['n'];
$Email = $_GET['e'];
$Charity = $_GET['c'];

$con = new mysqli($server,$username,$password,$dbName);

if (!$con) {
    die('Could not connect: '  . mysqli_error($con));
  }
  mysqli_select_db($con,$dbName);
  $sql= "INSERT INTO testglholiday (FullName, Email, Charity) VALUES ('$FullName', '$Email', '$Charity')";
  // $result = mysqli_query($con,$sql);
if(!mysqli_query($con,$sql)) //$con is mysql connection object
{
     die('Error : ' . mysqli_error($con));
}

mysqli_close($con);


?>