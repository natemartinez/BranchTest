<?php
//This php page will be used to update all stats that need to changed

session_start();
include '../db.php';

$name = strval($_SESSION['username']);

 if(isset($_POST)){
  $data = file_get_contents("php://input");
  $statChange = json_decode($data, true);

  
  $strStat = var_export($statChange['Strength'], 1);
  $wpStat = var_export($statChange['Willpower'], 1);
  $techStat = var_export($statChange['Technique'], 1);
  $agiStat = var_export($statChange['Agility'], 1);
  $perStat = var_export($statChange['Perception'], 1);
  $intStat = var_export($statChange['Intuition'], 1);

 $sql = "UPDATE stats 
        SET strength=$strStat,
            willpower=$wpStat,
            technique=$techStat,
            agility=$agiStat,
            perception=$perStat,
            intuition=$intStat
        WHERE name = '$name'"; //'nate' should be a variable that holds the current user's name
                              // to identify what user should have their stats changed
        

  if($conn->query($sql) === TRUE) {
   echo "Stats updated";
   }else{
     echo "Error: " . $sql . "<br>" . $conn->error;
  }
   
}

?>