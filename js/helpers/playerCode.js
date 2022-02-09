var lastestSave = "not saved";

function savePlayerCode(){
  savePlayerCodeToLocalStorage();
  saveCurrentPlayerCode();
  setLatestSavedCode();
  setMessageToPlayer("Saved ("+lastestSave+")");
};

function clearPlayerCode(){
  textareaPlayerCode.setValue(templateStartCode);
  setMessageToPlayer("Code cleared");
};

function resetPlayerCode(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  textareaPlayerCode.setValue(currentPlayer.code);
  setMessageToPlayer("Code is reset to latest save (at "+lastestSave+")");
};

function setLatestSavedCode(){
  var now = new Date();

  var hours = now.getHours();
  if (hours < 10) {
    hours = "0"+hours;
  }
  var min = now.getMinutes();
  if (min < 10) {
    min = "0"+min;
  }

  var sec = now.getSeconds();
  if (sec < 10) {
    sec = "0"+sec;
  }

  lastestSave = hours+":"+min+":"+sec;
};

function loadPlayerByEmail(){
  var searchMail = document.getElementById('search_email').value;
  var savedPlayerCode = JSON.parse(localStorage['savedPlayerCode']);

  for (var i = 0; i < savedPlayerCode.length; i++) {
    if(savedPlayerCode[i].email == searchMail){
      textareaPlayerCode.setValue(savedPlayerCode[i].code);
      localStorage['currentPlayer'] = JSON.stringify(savedPlayerCode[i]);
      setLatestSavedCode();
      setMessageToPlayer("Loaded code (at "+lastestSave+")");
      closeModal('load_player_modal');
      return;
    }
  }
  document.getElementById('load_player_msg').innerHTML = "No player with that email found";
};

function savePlayerCodeToLocalStorage(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  var savedPlayerCode = JSON.parse(localStorage['savedPlayerCode']);
  document.getElementById('play').disable = false;
  for (var i = 0; i < savedPlayerCode.length; i++) {
    if(currentPlayer.email == savedPlayerCode[i].email){
      savedPlayerCode[i].code = textareaPlayerCode.getValue();
      localStorage['savedPlayerCode'] = JSON.stringify(savedPlayerCode);
      return;
    }
  }
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  var newPlayerCode = {
    email: currentPlayer.email,
    name: currentPlayer.name,
    code : textareaPlayerCode.getValue()
  };
  savedPlayerCode.push(newPlayerCode);
  localStorage['savedPlayerCode'] = JSON.stringify(savedPlayerCode);
};

function saveCurrentPlayerCode(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  currentPlayer.code = textareaPlayerCode.getValue();
  localStorage['currentPlayer'] = JSON.stringify(currentPlayer);
};

function saveToGameCode(){
  localStorage['runningGamePlayer'] = localStorage['currentPlayer'];
  document.getElementById('player_1_name').innerHTML = JSON.parse(localStorage['runningGamePlayer']).name;
};

function setMessageToPlayer(messageToPlayer){
    var totalMsg = "["+JSON.parse(localStorage['currentPlayer']).name+"] "+messageToPlayer;
    document.getElementById('message_to_player').innerHTML = totalMsg;
};

function createPlayerAndCloseModal(){
  var playerName = document.getElementById('player_name').value;
  var currentPlayer = {
    name: playerName,
    email: document.getElementById('player_email').value,
    code: textareaPlayerCode.getValue()
  };
  localStorage['currentPlayer'] = JSON.stringify(currentPlayer);
  textareaPlayerCode.setOption("readOnly", false); //Ready to write code!
  setMessageToPlayer('player has been creted');
  closeModal('new_player');
};
function stopGame(){
  isGameRunning = false;
  document.getElementById('new_player_btn').disabled = false;
  document.getElementById('play').disabled = false;
  document.getElementById('stop').disabled = true;
};
