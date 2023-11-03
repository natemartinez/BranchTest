/*
    NOTES:
    - create class of events
    - create instances of those events - battle & search
      - What are the properties?
      TYPE, RESULT, CHANCE
      - How will these properties affect the outcome?
      and how do we get different properties based on input and data.
      For example, how do we determine what result will happen and how is the 
      chance of that choice coming out 
      - How will game move over to next level?
      IDEA: Maybe an array?
    
      PRIORITY:
      - Choices
      - Battle
      - Collecting items

*/

// Must receive stats from test or database using fetch()
// The keys must be strings
let userStats = {
    'str': 2,
    'per': 1,
    'agi': 3
};
  // This object will hold the current event(Battle, Search)
class Enemy{
    constructor(name, level, stats){
        this.name = name;
        this.level = level;
        this.stats = stats
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

const Baddie = new Enemy('Baddie', 1, {attack:5,health:20});

class BattleEvent{
    constructor(type, level, enemies){
        this.type = type;
        this.level = level;
        this.enemies = enemies;
    } 
}
class SearchEvent{
    constructor(level, collectList, choices){
        this.level = level;
        this.collect = collectList;
        this.choices = choices;
    } 
    // Randomly chooses what item will be collected
    // collectList will hold all the items that can be collected for that level
    // choices will be iterated to be displayed
}

const LevelOneBattle = new BattleEvent('battle','1.1',[Baddie, Baddie]);

//Every action has properties that determine:
// - What it will do
// - What type of action it is
// - The difficulty of action
const LevelOneSearch = new SearchEvent(1.1, [Dice, Stick, Shirt, MedKit],
                                    [{action:'Closet', type:'str', diff:1},
                                      {action: 'Bed', type:'agi', diff:1},
                                      {action:'Curtains',type:'per', diff:1},
                                      {action: 'Rug', type:'per', diff:1}]);

const Levels = [LevelOneSearch, LevelOneBattle];

// Use Levels[] to save on LocalStorage

const startBtn = $('#start-btn');
const choiceDiv = $('.choice-div');
const choiceBtn = $('.choice-btn');
const submitBtn = $('#submit-btn');
const continueBtn = $('#cont-btn');
const moveBtn = $('#move-btn');
const noBtn = $('#no-btn');
const yesBtn = $('#yes-btn');
//

//This function will trigger choices for battle and searching
// Have to find a way to set these choices automatically
let i = 0;

let chosenChoice = '';
let currentChoices = [];

choiceBtn.click(function(){
    submitBtn.addClass('active');
    submitBtn.removeClass('disappear');
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
   setChoices(Levels[i]);
   i++;
   $(this).toggleClass('disappear active');
   choiceDiv.toggleClass('active disappear');
});
submitBtn.click(function(){
    // Removes choice that was clicked, as well as the submit button
    $(this).toggleClass('disappear active');
    continueBtn.toggleClass('active disappear');
    let i = 0;
    selectChoice(chosenChoice, currentChoices);
    $(this).addClass('disappear');
    $('.clicked').addClass('disappear');
    i++;
    // create a function that finds the object that matches the button's text
});
continueBtn.click(function(){
    $('.result-div').toggleClass('disappear active');
    $(this).toggleClass('disappear active');
    $('.choice-btn').removeClass('no-click')
})
moveBtn.click(function(){
     // if the next level is a battle then remove choice-div
    // and add battle-div
    // give warning to move on, if they decline, remove warning and cancel operation
    $('#submit-btn').addClass('disappear');
    $('#submit-btn').removeClass('active');
    $('.move-notice').addClass('active');
})
noBtn.click(function(){
    $('.move-notice').removeClass('active');
   
})
yesBtn.click(function(){
    $('.move-notice').addClass('disappear');
    nextEvent(Levels[i]);
})


function setChoices(event){
   let curChoices = Object.keys(event.choices).length; 
   let choiceArray = [];
   for(let i=0; i < curChoices; i++){
    let userStr = userStats;
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
    // We use userCompare to know what to select inside userStats
    
    // Receives data from choices to add control flow
    // Turns data into an array of choice objects to be passed into displayChoices()

      if(choiceDifficulty < userCompare){
            choiceObj.choiceChance = 'easy';
            choiceArray.push(choiceObj);
      } else{
         choiceObj.choiceChance = 'hard';
         choiceArray.push(choiceObj);
      }
   }   
   displayChoices(choiceArray);

/*
Next Steps: 
- With choiceInfo, set a randomizer to determine success/failure
- Once random result is settled, how will result be determined
*/
   // output to displayChoices();: Must return with an array of objects
 /* If the event is:
 BATTLE - Start battle(); This function will start a usual battle 
 
 SEARCH - Start search(); This function will start the next search moment
                          with new choices
 Regardless of event, we must pass in to displayChoices();
 */
};

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

    // How am I going to send choices to choiceResult?

    // Delete choices that were chosen
    // Use a variable to keep track of the selected choices -- Could probably do that as an event Listener
    // Each choice will have a probability of success
    
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
            
        }
    } else if(choiceObj.choiceChance == 'hard'){
        if(random < 65){
            result = 'Fail'
        }else{
            result = 'Success';
            success(choiceObj.result);
        }
    }

    function success(result){
       // add xp and item -- all xp's is 15
       $('#result-info').text('+15 XP' + '+' + result.name);
        console.log(result)
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
}

function nextEvent(nextLevel){

    // Senses what type of level is next (Search or battle)
    if(nextLevel.type == 'battle'){
        // clear out all previous elements off-screen
        $('.move-notice').addClass('disappear');
        $('.move-notice').removeClass('active');
        choiceDiv.addClass('disappear');
        choiceDiv.removeClass('active');
        $('.combat-div').addClass('active');

        combatStart(nextLevel);

    }
}

function combatStart(currentStage){
    // In the future, put in a alert
    let enemies = currentStage.enemies;
    // Steps:
    /* 
    */
   const enemyInfoBox = $('.enemy-div'); 

   const enemyNameBox = $('#enemy-name');
   const enemyLvlBox = $('#enemy-lvl');
   const enemyHpBox = $('#enemy-hp');
   const enemyInfo = "<div><p id='enemy-name'></p><br><p id='enemy-lvl'></p><br><p id='enemy-hp'></p></div>";
  
   for(let i=0; i<enemies.length;i++){
    enemyInfoBox.append(enemyInfo);

    let enemyName = enemies[i].name;
    let enemyLvl = enemies[i].level;
    let enemyHp = enemies[i].stats.health;


    enemyNameBox.append(enemyName); 
    enemyLvlBox.text(enemyLvl); 
    enemyHpBox.text(enemyHp);
   }
}

function enemyLogic(enemy){
    // Damage dealt with be in correlation of their attack stat
    // Cause slashing image and sound to come out on screen
    // and cause user's hp to drop

}
/* 
    Battle Sequence:
It's important that we build the sequence around inputs such as items and traits
I should replicate that. It's important to make sure that we can hold stats
in JS to use rather than in PHP.


*/