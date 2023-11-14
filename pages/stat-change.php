<?php
//This php page will be used to update all stats that need to changed

session_start();
include '../db.php';

$name = strval($_SESSION['username']);

 if(isset($_POST)){
  $data = file_get_contents("php://input");
  $statChange = json_decode($data, true);

  $lvlStat = var_export($statChange['level'], 1);
  $hpStat = var_export($statChange['hp'], 1);
  $spStat = var_export($statChange['sp'], 1);
  $strStat = var_export($statChange['str'], 1);
  $wpStat = var_export($statChange['wp'], 1);
  $techStat = var_export($statChange['tech'], 1);
  $agiStat = var_export($statChange['agi'], 1);
  $perStat = var_export($statChange['per'], 1);
  $intStat = var_export($statChange['int'], 1);


  $sql = "UPDATE stats 
     SET level = $lvlStat,
        health = $hpStat,
        stamina = $spStat,
        strength = $strStat,
        willpower = $wpStat,
        technique = $techStat,
        agility = $agiStat,
        perception = $perStat,
        intuition = $intStat
    WHERE name = '$name'"; //'nate' should be a variable that holds the current user's name
                          // to identify what user should have their stats changed
    
   if($conn->query($sql) === TRUE) {
    echo 'User stats updated';
    }else{
      echo "Error: " . $sql . "<br>" . $conn->error;
   }
      
}

?>