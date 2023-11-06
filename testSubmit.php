<?php
session_start();
include 'db.php';
 
if(isset($_POST)){
  $data = file_get_contents("php://input");
  $result = json_decode($data, true);

  $name = var_export($result["name"], 1);
  $password = var_export($result["password"], 1);
  $mind = var_export($result["mind"], 1);
  $social = var_export($result["social"], 1);
  $wake = var_export($result["wake"], 1);
  $temper = var_export($result["temper"], 1);

 $sql = "INSERT INTO stats (name, password, mind, social, wake, temper)
VALUES ($name, $password, $mind, $social, $wake, $temper)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

}

?>