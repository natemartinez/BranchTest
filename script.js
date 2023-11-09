// load.php functionality
$('#register').click(function(){
    $('.load-btn').toggleClass('load-btn-out load-btn');
    $('.signup-form-0').toggleClass('signup-form-1 signup-form-0');
    $('.load-menu').toggleClass('load-menu-out load-menu')
});
$('#login').click(function(){
    $('.load-btn').toggleClass('load-btn-out load-btn');
    $('.login-form-0').toggleClass('login-form-1 login-form-0');
    $('.load-menu').toggleClass('load-menu-out load-menu');
});
$('#login-link').click(function(){
    $('.signup-form-1').toggleClass('signup-form-0 signup-form-1');
    $('.login-form-0').toggleClass('login-form-1 login-form-0');
    $('.load-menu').toggleClass('load-menu-out load-menu');
});
$('#signup-link').click(function(){
    $('.signup-form-0').toggleClass('signup-form-1 signup-form-0');
    $('.login-form-1').toggleClass('login-form-0 login-form-1');
    $('.load-menu').toggleClass('load-menu-out load-menu')
});



$('#open-menu').click(function(){
   $('.main-menu').toggleClass('main-menu-active');
});
$('#close-menu').click(function(){
    $('.main-menu').toggleClass('main-menu-active');
})

// For the character.php page functionality(front-end)

$('#bio-link').click(function(){
    $('#bio-content').removeClass('content-deactive');
    $('#dna-content').addClass('content-deactive');
    $('#stats-content').addClass('content-deactive');
});
$('#dna-link').click(function(){
    $('#dna-content').removeClass('content-deactive');
    $('#bio-content').addClass('content-deactive');
    $('#stats-content').addClass('content-deactive');
});
$('#stats-link').click(function(){
    $('#stats-content').removeClass('content-deactive');
    $('#dna-content').addClass('content-deactive');
    $('#bio-content').addClass('content-deactive');
});

// Character test to determine identity 
let mainText = $('#main-text');

let hemisphereTrait = ''; // left/right-brained
let socialTrait = ''; //intro/extro-verted
let wakeTrait = ''; //earlyBird/nightOwl
let temperTrait = '';//hotHeaded/coldBlooded

let testButton1 = $('#choice1');
let testButton2 = $('#choice2');
let nextButton = $('#next-btn');
let backButton = $('#back-btn');
let beginButton = $('#begin-btn');
let submitButton = $('#submit-btn');
let dnaBtn = $("#dna-btn");

let questions = [
    "Are you Logical or Creative?",
    "Are you Introverted or Extroverted?",
    "Do you prefer to wake up early or stay up later?",
    "What would you say your temper is like?"
];
let traits = [
    'Logical','Creative',
    'Introvert','Extrovert', 
    'Early Bird','Night Owl',
    'Hot-headed','Cold-blooded' 
];

let answer = [];
let choiceSelect = false; // checks if button was selected
let choice = ''; // Holds to chosen value

let i = 0;

let x = 0; // Variables will be used to
let y = 1; // give choice buttons their names with iteration

testButton1.click(function(){
    choice = testButton1.text();
    choiceSelect = true;
    
});
testButton2.click(function(){
    choice = testButton2.text();
    choiceSelect = true;
});

beginButton.click(function(){
    let textBox = $('#name-input');
    const nameInput = $('#name-input').val();
    
    textBox.css('display', 'none');
    beginButton.css('display', 'none');
    nextButton.css('display', 'unset');
    backButton.css('display', 'unset');

    testButton1.css('display', 'unset');
    testButton1.text(traits[x]);
    testButton2.css('display', 'unset');
    testButton2.text(traits[y]);
    
    mainText.text(questions[i]);
    answer.push(nameInput);
});

nextButton.click(function(){
    if(choiceSelect){
        answer.push(choice);
        choiceSelect = false;
    } else{
        alert('you must select a choice');
        return
    }

    x = x + 2;
    y = y + 2;
    i += 1; 

    mainText.text(questions[i]);
    testButton1.text(traits[x]);
    testButton2.text(traits[y]);

    if(i == 4){
       mainText.text("Your result is complete");
       nextButton.css('display', 'none');
       backButton.css('display', 'none');
       testButton1.css('display', 'none');
       testButton2.css('display', 'none');
       submitButton.css('display', 'unset');
    }
});

backButton.click(function(){
    i -= 1;
    x = x - 2;
    y = y - 2;

    mainText.text(questions[i]);
    testButton1.text(traits[x]);
    testButton2.text(traits[y]);
});

submitButton.click(function(e){
    e.preventDefault();
    sendResults(answer);
    location.href = "pages/character.php";
});

dnaBtn.click(function(){
    // This function will receive the JSON to affect the styling
    // of the elements
    let brainImg = $('#brain');
    let introSide = $('#intro-img');
    let extroSide = $('#extro-img');
    let earlyBird = $('#earlybird-img');
    let nightOwl = $('#nightowl-img');
    let coldBlood = $('#snowflake-img');
    let hotHead = $('#flame-img');
    
    // raise scale of chosen stats 
    // and lower opacity of other
    switch(userID.Mind){
        case "Logical":
         brainImg.attr('src', '../images/left-brain.png');
         break;
        case "Creative":
         brainImg.attr('src', '../images/right-brain.png');
         break;
    }
    switch(userID.Social){
        case "Introvert":
         introSide.css('width', '7em');
         extroSide.css('opacity', '40%');
         break;
        case "Extrovert":
         extroSide.css('width', '7em');
         introSide.css('opacity', '40%');
         break;
    }
    switch(userID.Wake){
        case "Early Bird":
            earlyBird.css('width', '8em');
            nightOwl.css('opacity', '20%');
         break;
        case "Night Owl":
            nightOwl.css('width', '7em');
            earlyBird.css('opacity', '40%');
         break;
    }
    switch(userID.Temper){
        case "Hot-headed":
            hotHead.css('width', '8em');
            coldBlood.css('opacity', '20%');
         break;
        case "Cold-blooded":
            coldBlood.css('width', '7em');
            hotHead.css('opacity', '40%');
         break;
    }

});

// Inventory page
let itemSlot = $('.item');

itemSlot.click(function(e){
    //grabs info based on id in the slot
    e.preventDefault();
    let itemID = $(this).attr('id');
    let savedInventory = JSON.parse(sessionStorage.getItem('inventory'));
    
    $('#info-name').text(savedInventory[itemID].name);
    $('#info-type').text(savedInventory[itemID].type);
    $('#info-rarity').text(savedInventory[itemID].rarity);
})

function sendResults(stats){
    console.log(stats);
    let result = {
       "name": stats[0],
       "password": stats[1],
       "mind": stats[1],
       "social": stats[2],
       "wake": stats[3],
       "temper": stats[4],
    };

    $.post("testSubmit.php", JSON.stringify(result), function(data){
        let identity = data;
        console.log(identity);
    }, "text")
    .done(function(){
        console.log("request done")
    })
};

/* functions for displaying stats & test results */
let userID = {};
console.log(userID);
function receiveJSON(){
  fetch('pages/info-check.php')
  .then(response => response.json())
  .then(data => {
    userID = {
        "Name": data.name,
        "password": data.password,
        "Mind": data.mind,
        "Social": data.social,
        "Temper": data.temper,
        "Wake": data.wake,
    }
    resultStart(userID);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};
receiveJSON(); // Allows us to use userID values

function resultStart(stats){ //This function initializes stats for user         
     
    let strStat = 0;
    let wpStat = 0;
    let techStat = 0;
    let agiStat = 0;
    let perStat = 0;
    let intStat = 0;
   
    switch(stats.Mind){
        case "Logical":
         perStat++;
         intStat++;
         break;
        case "Creative":
         techStat++;
         wpStat++;
         break;
    }
    switch(stats.Social){
        case "Introvert":
            perStat++;
            techStat++;
            intStat++;
         break;
        case "Extrovert":
            strStat++;
            wpStat++;
            agiStat++;
         break;
    }
    switch(stats.Wake){
        case "Early Bird":
            strStat++;
            intStat++;
         break;
        case "Night Owl":
            wpStat++;
            perStat++;
         break;
    }
    switch(stats.Temper){
        case "Hot-headed":
            strStat++;
            wpStat++;  
         break;
        case "Cold-blooded":
            techStat++;
            agiStat++;
         break;
    }


    const intStats = {
     "Strength": strStat,
     "Willpower": wpStat,
     "Technique": techStat,
     "Agility": agiStat,
     "Perception": perStat,
     "Intuition": intStat,
    }

    const sendStatChange = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intStats)
    };

   fetch('pages/stat-change.php', sendStatChange)
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    //Send stats to another function

}
// Actual gameplay
// Must receive stats from test or database using fetch()
// This object will hold the current event(Battle, Search)
class Enemy {
    constructor(name, level, stats, img){
        this.name = name;
        this.level = level;
        this.stats = stats;
        this.img = img;
    } 
    // Every enemy instance will have their own unique properties
}
class Item {
    constructor(name,type,effect,rarity,img){
        this.name = name;
        this.type = type;
        this.effect = effect;
        this.rarity = rarity;
        this.img = img;
    }
};

const Dice = new Item('Dice', 'Outcome', 'Outcome', 'Common');//item randomly chooses in battle
const Stick = new Item('Stick','Attack','Health', 'Common');
const Shirt = new Item('Shirt','Gear','Armor','Common');
const MedKit = new Item('Med-Kit', 'Support','Health','Common');

const Baddie = new Enemy('Baddie', 1, {attack:5,health:20}, 'images/dabber.png');
class BattleEvent{
    constructor(level,type, enemies){
        this.level = level;
        this.type = type;
        this.enemies = enemies;
    } 
}
class SearchEvent{
    constructor(level, type, collectList, choices){
        this.level = level;
        this.type = type;
        this.collect = collectList;
        this.choices = choices;
    } 
    // Randomly chooses what item will be collected
    // collectList will hold all the items that can be collected for that level
    // choices will be iterated to be displayed
}

const LevelOneSearch = new SearchEvent(1.1, 'search' , [Dice, Stick, Shirt, MedKit],
                                    [{action:'Closet', type:'str', diff:1},
                                      {action: 'Bed', type:'agi', diff:1},
                                      {action:'Curtains',type:'per', diff:1},
                                      {action: 'Rug', type:'per', diff:1}]);

                                      
const LevelOneBattle = new BattleEvent(1.2, 'battle',[Baddie, Baddie]);

const Levels = [LevelOneSearch, LevelOneBattle];


/* BUTTONS */
const startBtn = $('#start-btn');
const choiceDiv = $('.choice-div');
const choiceBtn = $('.choice-btn');
const acceptBtn = $('#accept-btn');
const continueBtn = $('#cont-btn');
const moveBtn = $('#move-btn');
const saveBtn = $('#save-btn');
const noBtn = $('#no-btn');
const yesBtn = $('#yes-btn');
const attackBtn = $('#attack-btn');


//This function will trigger choices for battle and searching
// Have to find a way to set these choices automatically
let a = 0;
let chosenChoice = '';
let currentChoices = [];
let userProgress = '';

/* BUTTONS' FUNCTIONS */
choiceBtn.click(function(){
    acceptBtn.addClass('active');
    acceptBtn.removeClass('disappear');
    let selectedChoice = $(this).text();
    chosenChoice = selectedChoice;
    // if the button clicked is the 'move-on', then hide the submit button
    // if element has not-clicked, then just change that specific element
    // change the rest to clicked
    if($(this).hasClass('not-clicked')){
      $(this).toggleClass('clicked not-clicked');
      $(this).siblings('.choice-btn').removeClass('clicked');  
      $(this).siblings('.choice-btn').addClass('not-clicked');  
    };
    // Activate animation that shows an annoucement of the probability and result
    // if choice succeeds
});
startBtn.click(function(){
// This button's function will iterate through the levels one at a time
// For now, I just want to return each event one at a time
    
       fetch('receiveStats.php')
       .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
       })
       .then(data => {
           // I need to be able to use the data outside of here
           // what if I use a function
           setChoices(Levels[a], data);
       })
       .catch(error => {
           console.error('Error:', error);
       }); 


   $(this).toggleClass('disappear active');
   choiceDiv.toggleClass('active disappear');
});
acceptBtn.click(function(){
    // Removes choice that was clicked, as well as the submit button
    $(this).toggleClass('disappear active');
    continueBtn.toggleClass('active disappear');
    let a = 0;
    selectChoice(chosenChoice, currentChoices);
    $(this).addClass('disappear');
    $('.clicked').addClass('disappear');
    a++;
    // create a function that finds the object that matches the button's text
});
continueBtn.click(function(){
    $('.result-div').toggleClass('disappear active');
    $(this).toggleClass('disappear active');
    $('.choice-btn').removeClass('no-click')
});
moveBtn.click(function(){
     // if the next level is a battle then remove choice-div
    // and add battle-div
    // give warning to move on, if they decline, remove warning and cancel operation
    $('#submit-btn').addClass('disappear');
    $('#submit-btn').removeClass('active');
    $('.move-notice').addClass('active');
});
noBtn.click(function(){
    $('.move-notice').removeClass('active');
   
});
yesBtn.click(function(){
    $('.move-notice').addClass('disappear');

    setChoices(Levels[a], userProgress);
    // the yes button should only carry levels over
    // not stats, userProgress shouldnt be here
});
attackBtn.click(function(){
    
});

saveBtn.click(function(){
    saveProgress();

});

function saveProgress(event, userData){
    // turn userData to JSON and then send to PHP
    console.log(event, userData);

     fetch('save.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event, userData),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
     })
    .then(data => {
        console.log(data);
     })
    .catch(error => {
        console.error('Fetch error:', error);
     });
}
function loadProgress(event, userData){
    // configure the get request in this function
    
    console.log(event, userData);

     fetch('load.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event, userData),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
     })
    .then(data => {
        console.log(data);
     })
    .catch(error => {
        console.error('Fetch error:', error);
     });
}

function setChoices(event, userData){
   saveProgress(event, userData);
   userProgress = userData;

   if(event.type == 'battle'){
    // clear out all previous elements off-screen
    $('.move-notice').addClass('disappear');
    $('.move-notice').removeClass('active');
    choiceDiv.addClass('disappear');
    choiceDiv.removeClass('active');
    $('.combat-div').addClass('active');

    combatStart(event, userData);

   }else if(event.type == 'search'){
    let choiceArray = [];
    for(let i=0; i < event.choices.length; i++){
      let userStr = userData;
      let choiceDifficulty = event.choices[i].diff;
      let choiceType = event.choices[i].type;
      let choiceReward = event.collect[i];
      let choiceName = event.choices[i].action;
      // Variables above will be used to determine choice probability
      let choiceObj = {
          choiceName:choiceName,
          type: choiceType,
          result: choiceReward
       };

      let userCompare = userStr[choiceObj.type];

      if(choiceDifficulty < userCompare){
            choiceObj.choiceChance = 'easy';
            choiceArray.push(choiceObj);
      } else{
         choiceObj.choiceChance = 'hard';
         choiceArray.push(choiceObj);
      }
    }   
    a++;
    displayChoices(choiceArray);  
   };
};

function update(){

}

function displayChoices(choices){
    // Select the elements' id that will be used to displayed 
    for(let i = 0; i < choices.length; i++){
    // let the text of the selected choice element be the same as the selected
    // choice in the 'choices' array
      let name = choices[i].choiceName;
      let difficulty = choices[i].choiceChance;
      let choiceText = '#choice-' + i;

      $(choiceText).text(name);
      $(choiceText).addClass(difficulty);
      currentChoices.push(choices[i]);
    }
};

function selectChoice(selected, choiceArray){
  //  Finds object that matches the selected button texts
  for(let i=0; i < choiceArray.length;i++){
     if(selected === choiceArray[i].choiceName){
      let chosenObj = choiceArray[i];
      choiceResult(chosenObj);
    } else{
        console.log('Not it chief');
    }
  }
}

function choiceResult(choiceObj){
    let random = Math.floor(Math.random() * 100);
    let result = '';
    console.log(choiceObj);

    if(choiceObj.choiceChance == 'easy'){
        if(random < 99){
            result = 'Success';
            success(choiceObj.result);
        } else{
            result = 'Fail';
            fail();
        }
    } else if(choiceObj.choiceChance == 'hard'){
        if(random < 65){
            result = 'Fail';
            fail();
        }else{
            result = 'Success';
            success(choiceObj.result);
        }
    }

    function success(result){
       // add xp and item -- all xp's is 15
       $('#result-info').text('+15 XP' + '+' + result.name);
    }
    function fail(){
       $('#result-info').text('You found nothing');
    }
    
    //outputs the result
    //makes other elements before it non-clickable until continue button is clicked
    $('.result-div').toggleClass('active disappear');
    $('.result-div').addClass('fade-div-in');
    $('.choice-btn').addClass('no-click')
    
    $('#result-text').text(result);
    
    // Sense when choice has been clicked

    // function that outputs results based on success and fail
    // Success - Save new item into inventory
    // Fail - Nothing

    // update();
}

function combatStart(currentStage, userData){
  //  console.log(currentStage, userData);

    let enemies = currentStage.enemies;
    const enemyInfoBox = $('.enemy-div');

   for(let i=0;i<enemies.length;i++){
    const enemyInfo = "<div class='enemy-info'><img src='" + enemies[i].img + "' class='enemy-img' '><div><p id='enemy-name-" +
     [i] + "'></p><br><p id='enemy-lvl-" + [i] + "'></p><br><p id='enemy-hp-" + [i] + "'></p></div></div>";
    enemyInfoBox.append(enemyInfo);
   }
   addEnemies(enemies);
}

function addEnemies(enemyObject){
   for(let i=0; i<enemyObject.length;i++){
    const enemyNameBox = $('#enemy-name-' + [i]);
    const enemyLvlBox = $('#enemy-lvl-' + [i]);
    const enemyHpBox = $('#enemy-hp-' + [i]); 
    const enemyImgBox = $('#enemy-img-' + [i]); 

     enemyNameBox.text(enemyObject[i].name);
     enemyLvlBox.text('Level ' + enemyObject[i].level);
     enemyHpBox.text('HP ' + enemyObject[i].stats.health) 
     //enemyImgBox.src = 'images/dabbers.png';
   }
   
}

function attackOptions(userStats){
    // receive user stats to see what type of options come up
}

function enemyLogic(enemy){
    // Damage dealt with be in correlation of their attack stat
    // Cause slashing image and sound to come out on screen
    // and cause user's hp to drop
    // user's hp drop = enemy's attack stat
}
/* 
    Battle Sequence:
It's important that we build the sequence around inputs such as items and traits
I should replicate that. It's important to make sure that we can hold stats
in JS to use rather than in PHP.


*/