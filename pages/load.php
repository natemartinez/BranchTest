<?php

session_start();
include '../db.php';

 $name = strval($_SESSION['username']);

 if(isset($_GET)){

//$sql = "SELECT stagelevelhealth stamina strength willpowertechnique
 //agility perceptionintuition
   $sql = "SELECT stage, level, health, stamina, strength, willpower, technique,
   agility, perception, intuition FROM stats WHERE name = '$name'";

   $result = $conn->query($sql);
   
   // Check if the query was successful
   if ($result) {
       // Fetch the data and process it
       while ($row = $result->fetch_assoc()) {
          $data = array(
            'stageNum' => $row['stage'],
            'level' => $row['level'],
            'hp' => $row['health'],
            'sp' => $row['stamina'],
            'str' => $row['strength'],
            'wp' => $row['willpower'],
            'tech' => $row['technique'],
            'agi' => $row['agility'],
            'per' => $row['perception'],
            'int' => $row['intuition'],
          );

          $JSONdata = json_encode($data);
           
          echo $JSONdata; 
           // Process other columns as needed
       }
     
       // Free the result set
       $result->free();
   } else {
       echo "Error: " . $conn->error;
   }
   
   // Close the connection
   $conn->close();
  }
?>
          