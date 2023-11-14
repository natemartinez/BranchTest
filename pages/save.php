<?php

//This php page will be used to update all stats that need to changed

session_start();
include '../db.php';

$name = strval($_SESSION['username']);

 if(isset($_POST)){
  $data = file_get_contents("php://input");
  $statChange = json_decode($data, true);
  
  $stage = var_export($statChange['stageInfo']['stage'], 1);
  $lvlStat = var_export($statChange['stats']['level'], 1);
  $hpStat = var_export($statChange['stats']['hp'], 1);
  $spStat = var_export($statChange['stats']['sp'], 1);
  $strStat = var_export($statChange['stats']['str'], 1);
  $wpStat = var_export($statChange['stats']['wp'], 1);
  $techStat = var_export($statChange['stats']['tech'], 1);
  $agiStat = var_export($statChange['stats']['agi'], 1);
  $perStat = var_export($statChange['stats']['per'], 1);
  $intStat = var_export($statChange['stats']['int'], 1);

  $sql = "UPDATE stats 
     SET 
            stage = $stage,
            level = $lvlStat,
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
    echo 'Progress saved';
    }else{
      echo "Error: " . $sql . "<br>" . $conn->error;
   }


} 

?>
