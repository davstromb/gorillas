var agent_angle = Number.MIN_VALUE;
var agent_force = Number.MIN_VALUE;
var agent_memory = null;

var agent_2_angle = 10;
var agent_2_force = 10;
var agent_2_memory = {};

var isGameRunning = true;
var textareaPlayerCode;

var titleMusic = new Audio('audio/intro.ogg');
titleMusic.play();

var RulesModalText = "About<br><br>"+
  "The Javascript code in the textbox below control Player 1 (The monkey to the left). "+
  "A game consists of a total of 3 rounds with 10 throws per monkey and round. If no "+
  "monkey has hit the other after 10 throws that round is considered a draw.<br/><br />"+
  "Score<br><br>Hitting the opponent gives you 10 points minus the number of throws "+
  "consumed during the round. So if you hit your opponent after three bananas you get 7"+
  " points for example. A draw means 0 points for both players. If you hit the sun you "+
  "double your current points, even if you lose that round. When the game "+
  "is finished, the winner gets the difference between the two scores as the winning score.";

var templateStartCode = ""+
"function runPlayer(lastBananaHit, opponent, wind, memory){\n"+
"  if(memory === null) {memory = 0;}\n"+
"  else if(memory > 50) {memory = 10;}\n"+
"  if(lastBananaHit['x'] > opponent['x']) {\n"+
"    memory -= 7;\n"+
"  } else {\n"+
"    memory += 7;\n"+
"  } \n"+
"  var angle = 60;\n"+
"  var velocity = 5 - wind + memory;\n"+
"\n"+
"  var returnValues = new Object();\n"+
"  returnValues['velocity'] = velocity;\n"+
"  returnValues['angle'] = angle;\n"+
"  returnValues['memory'] = memory;\n"+
"  return returnValues;\n"+
"};\n";

var emptyCurrentPlayer = {
  name: '-',
  email: '-',
  code: templateStartCode
}
var emptySavedPlayers = [{
  name: '-',
  email: '-',
  code: templateStartCode,
}];

if(!localStorage['currentPlayer']){
  localStorage['currentPlayer'] = JSON.stringify(emptyCurrentPlayer);
}
if(!localStorage['savedPlayerCode']){
  localStorage['savedPlayerCode'] = JSON.stringify(emptySavedPlayers);
}
if(!localStorage['runningGamePlayer']){
  localStorage['runningGamePlayer'] = JSON.stringify(emptyCurrentPlayer);
}
if(!localStorage['highscoreList']){
  localStorage['highscoreList'] = JSON.stringify([]);
}
// Reset localStorage
/*
localStorage['currentPlayer'] = JSON.stringify(emptyCurrentPlayer);
localStorage['savedPlayerCode'] = JSON.stringify(emptySavedPlayers);
localStorage['runningGamePlayer'] = JSON.stringify(emptyCurrentPlayer);
localStorage['highscoreList'] = JSON.stringify([]);
*/
