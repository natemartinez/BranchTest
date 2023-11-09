<?php    
 session_start();

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
  
    <!-- Font Awesome JS -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
</head>

<body>

  <div class='info-input'>
    <img id="logo" src="images/branchTest-Logo.png" alt="Website logo">
    <div class='load-menu text-center'>
       <p class='error'><?php if(isset($_GET['signuperror'])){
          echo $_GET['signuperror'];
        } ?></p>
        <p class='error'><?php if(isset($_GET['loginerror'])){
          echo $_GET['loginerror'];
        } ?></p>
       <button class='load-btn' id='register'>Register</button>
       <button class='load-btn' id='login'>Login</button> 
    </div>

    <div class='form-div'>
       <form class='signup-form-0' action='testSubmit.php' method='post'>
        
        <p class='success'><?php if(isset($_GET['success'])){
          echo $_GET['success'];
        } ?></p>
        <input type="text" class='name-input' name='name' for='name' placeholder='Username' required>
        <input type="text" class='pswd-input' name='password' for='password' placeholder='Password' required>
        <p id='pswd_err'></p>
        <input type="text" for='re-password' name='re-password' placeholder='Reenter password' required>
        <button id='start-btn' type='submit'>Start</button>
        <br>
        <br>
        <a id='login-link'>Already have an account?</a>
       </form>
       
    </div>
   
  </div>

  <div class='test-div'>
    <h1 class='mt-4 mb-5 text-center'>Personality Test</h1>
    <div class='test-div'>
      <p id='main-text'>
        This test will give you traits & abilities based on the answers your provide.
        <br>
        You must click one of the choice buttons below to continue.
        <br>
        Press 'Begin' when you're ready
      </p>

      <div id='button-div'>
       <button class='choice-btn' id='choice1'>Choice 1</button>
       <button class='choice-btn' id='choice2'>Choice 2</button>
      </div>
     
      <input type='submit' value='Begin' class='question-btn' id='begin-btn'></input>

      <div class='d-flex flex-row'>
        <button class='question-btn' id='back-btn'>Back</button>
        <button class='question-btn' id='next-btn'>Next</button>      
      </div>

      <form name='test' method='post' action='testSubmit.php'>
        <input type="button" value='Submit' id='submit-btn' name='result' class='question-btn'>
      </form>
    </div>
  </div>
   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script type="text/javascript" src="script.js"></script>
</body>
</html>

