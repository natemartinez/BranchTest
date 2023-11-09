<?php
header('Content-Type: application/json');
session_start();
include 'db.php';
$name = $_SESSION['username'];
$allStats = "SELECT * FROM stats WHERE name = '$name'";
$result2 = $conn->query($allStats);

if ($result2 == TRUE) {
  if ($result2 -> num_rows > 0) {
   $row = $result2 -> fetch_assoc();

   $stats = array(
    "Level" => $row['level'],
    "HP" => $row['health'],
    "SP" => $row['stamina'],
    "Mind" => $row['mind'],
    "Social" => $row['social'],
    "Wake" => $row['wake'],
    "Temper" => $row['temper'],
    "str" => $row['strength'],
    "wp" => $row['willpower'],
    "tech" => $row['technique'],
    "agi" => $row['agility'],
    "int" => $row['intuition'],
    "per" => $row['perception'],
   );
  } else{
      echo "No records found with ID: $id";
    }
} else{
     echo "Error";
};

// Now put all of the data into an array

echo json_encode($stats);
?>