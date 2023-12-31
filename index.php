<?php
include 'db.php';
session_start();

// receive stats from signin user
$name = $_SESSION['name'];

$allStats = "SELECT * FROM stats WHERE name = '$name'";

$result2 = $conn->query($allStats);

 if ($result2 == TRUE) {
   if ($result2->num_rows > 0) {
    $row = $result2->fetch_assoc();
    $hp = $row['health'];
    $sp = $row['stamina'];
   }else {
     echo "No records found with ID: $id";
   }
 }else{
   echo "Error";
 };

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CYOA</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  
    <!-- Font Awesome JS -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
</head>

<body>
   <div class='hud-menu'>
       <div id='level-div'>
        <img id='level-circle' src="icons/level-circle.png" alt="black circle">
        <p>1</p>
       </div>
       <div id='user-vitals'>
        <p id='hp-stat'>HP: <?php echo $hp;?></p>
        <p id='sp-stat'>SP: <?php echo $sp;?></p>
       </div>
       
   </div>

    <button class='active' id='start-btn'>Start</button>

    <div class='choice-div disappear'>
            <p id='main-text'></p>
            <button id='choice-0' class='choice-btn not-clicked'>Choice 1</button>
            <button id='choice-1' class='choice-btn not-clicked'>Choice 2</button>
            <button id='choice-2' class='choice-btn not-clicked'>Choice 3</button>
            <button id='choice-3' class='choice-btn not-clicked'>Choice 4</button>
            <button id='move-btn' class='choice-btn'>Move on</button>
            <button class='disappear' id='accept-btn'>Accept</button>
    </div>

    <div class='container'>
         <div class='result-div disappear'>
            <h2 id='result-text'></h2>
            <p id='result-info'></p>
            <button class='disappear' id='cont-btn'>Continue</button>
         </div>
         <div class='move-notice disappear'>
            <h2>Are you sure you want to move on?</h2>
            <div>
                <button id='no-btn'>No</button>
                <button id='yes-btn'>Yes</button>
            </div>
         </div>
    </div>

    <div class='combat-div disappear'>
          <div class='enemy-div'>
            
          </div>
          <div class='choices'>
            <button>Attack</button>
            <button>Item</button>
            <button>Escape</button>
            <button>Analysis</button>
          </div>
    </div>

    <div class='menu text-center'>
          <a id='open-menu' href="javascript:void(0)">Open Menu</a>
    </div>

    <div class='main-menu'>
        <a id='close-menu' href="javascript:void(0)">Close Menu</a>
        <div class='menu-div'>
         <a href="pages/character.php">Character</a>
        </div>
        <div class='menu-div'>
         <a href="pages/inventory.php">Inventory</a>
        </div>
        <div class='menu-div'>
        <a href="pages/skills.php">Skills</a>
        </div>                
        <div class='menu-div'>
        <a href="pages/goals.php">Goals</a>
        </div>                           
        <div class='menu-div'>
          <button id='logout-btn'><a href="test.php">Log out</a></button>
        </div>                           
    </div>
   
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"> integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script type="text/javascript" src="script.js"></script>
</body>
</html>