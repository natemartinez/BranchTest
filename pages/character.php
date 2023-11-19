<?php    
 session_start();
 include '../db.php';

 $username = "SELECT name FROM stats ORDER BY id DESC LIMIT 1";
 $result = $conn->query($username);
 $name = strval($_SESSION['username']);
 //Displays name of user
 if ($conn->query($username) == TRUE) {
   if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        // sets $username to $playername to be displayed
       $_SESSION['username'] = $row["name"];
      };
   }else{
       echo "Error: " . $username . "<br>" . $conn->error;
     } 
 }else{
    echo "Error";
};

//Receives all stats of current user to be displayed
$allStats = "SELECT * FROM stats WHERE name = '$name'";

$result2 = $conn->query($allStats);

 if ($result2 == TRUE) {
   if ($result2->num_rows > 0) {
    $row = $result2->fetch_assoc();
    $level = $row['level'];
    $strength = $row['strength'];
    $willpower = $row['willpower'];
    $technique = $row['technique'];
    $agility = $row['agility'];
    $intuition = $row['intuition'];
    $perception = $row['perception'];
   }else {
     echo "No records found with ID: $id";
   }
 }else{
   echo "Error";
 };


$conn->close();
?>

<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CYOA</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="menu-styles/character.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3&display=swap" rel="stylesheet">
  
    <!-- Font Awesome JS -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
</head>

<body>

    <div id='char-menu'>
     <a href="../index.php"><img id='back-arrow' src="../images/back-arrow.png" alt=""></a>
     <div id='bio-link' class='char-links'>
        <button id='bio-btn'>Bio</button>
     </div>       
     <div id='dna-link' class='char-links'>
        <button id='dna-btn'>DNA</button>
     </div>       
     <div id='stats-link' class='char-links'>
        <button id='stats-btn'>Stats</button>
     </div>         
    </div>

    <div id='char-wrapper'>
        <div class='char-content' id='bio-content'>    
          <div id='bio-stats'>
            <div>
             <p>Name: <?php echo $_SESSION['username']; ?></p>
             <p>Level: <?php echo $level; ?></p>
            </div>      
          </div>

          <div id='bio-btns'>
            <button id='inv-link'><a href="inventory.php">Inventory</a></button>
            <button id='skills-link'><a href="skills.php">Skills</a></button>
          </div>
        </div>
        <div class='char-content content-deactive' id='dna-content'>

          <p></p>

          <div id='brain-div'>
            <img id='brain' src="../images/demo-brain.png" alt="top view of brain">
            <div id='brain-title'>
             <p id='logical-title'>Logical</p>
             <p id='creative-title'>Creative</p> 
            </div>    
          </div>     

          <div id='dna-stats'>
            <div class='dna-div' id='left-div'>
              <img class='social-img' id='intro-img' src="../images/introvert.png" alt="">  
              <p id='introvert-title'>Introverted</p>
              <img class='wake-img' id='earlybird-img' src="../images/earlybird.png" alt="">
              <p id='earlyB-title'>Early Bird</p>
              
              <img class='temp-img' id='snowflake-img' src="../images/snowflake.png" alt="">
              <p id='coldB-title'>Cold-blooded</p>              
            </div>
            <div class='dna-div' id='right-div'>
              <img class='social-img' id='extro-img' src="../images/extrovert.png" alt=""> 
              <p id='extro-title'>Extroverted</p>
            
              <img class='wake-img' id='nightowl-img' src="../images/nightowl.png" alt="">              
              <p id='nightO-title'>Night Owl</p>

              <img class='temp-img' id='flame-img' src="../images/flame.png" alt="">
              <p id='hotH-title'>Hot-headed</p>              
                         
            </div>
          </div>
  
        </div>
        <div class='char-content content-deactive text-center' id='stats-content'>
          <p>Attributes</p>  
    
            <div>
              <form action="/action_page.php">
              <label for="strength"><h3>Strength:</h3></label>
               <p id='str-stat'><?php echo $strength; ?></p>
              </form>
            </div>    
            <div>
               <form action="/action_page.php">
                <label for="willpower"><h3>Willpower:</h3></label>
                <p id='wp-stat'><?php echo $willpower; ?></p>
               </form>
            </div>
            <div>
  
              <form action="/action_page.php">
               <label for="technique"><h3>Technique:</h3></label>
               <p id='tech-stat'><?php echo $technique; ?></p>
              </form>
            </div>
            <div>
              
              <form action="/action_page.php">
                <label for="agility"><h3>Agility:</h3></label>
                <p id='agi-stat'><?php echo $agility; ?></p>
              </form>                     
            </div>
            <div>
               <form action="/action_page.php">
                <label for="intuition"><h3>Intuition:</h3></label>
                <p id='int-stat'><?php echo $intuition; ?></p>
               </form>               
            </div>
            <div>
              <form action="/action_page.php">
               <label for="perception"><h3>Perception:</h3></label>
               <p id='per-stat'><?php echo $perception; ?></p>
              </form>
            </div>

        </div>
    </div>

   
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT" crossorigin="anonymous"></script>    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script type="text/javascript" src="../script.js"></script>
</body>
</html>

