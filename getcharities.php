<?php
$server = 'box5154.bluehost.com';
$port = 3306;
$dbName = 'dhcaptur_glholiday';
$username = 'dhcaptur_gltest';
$password = 'sdRI%)ZS*lh9';
// $p = $_GET['p']
//$q = intval($_GET['q']);
// header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
// header("Cache-Control: post-check=0, pre-check=0", false);
// header("Pragma: no-cache");
$con = new mysqli($server,$username,$password,$dbName);
if (!$con) {
    die('Could not connect: '  . mysqli_error($con));
  }
  //mysqli_select_db($con,$dbName);
  $sql="SELECT * FROM `testglholiday` WHERE 1";
  
  $result = mysqli_query($con,$sql);

  //create an array
  $emparray = array();
while($row = mysqli_fetch_assoc($result)) {

  $emparray[] = $row;
}
echo json_encode($emparray);
mysqli_close($con);

?>