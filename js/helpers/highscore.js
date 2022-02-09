function highscoreTableUpdate(){
  var nullPlayer = {
    name: '-',
    email: '-',
    code: '-',
    score: 0
  };
  var nbrOfPlayersOnHighScore = 5;
  
  if(localStorage['highscoreList']){
    highscoreList = JSON.parse(localStorage['highscoreList']);
  }else{
    highscoreList = [];
  }

  if(highscoreList.length>1){
    highscoreList.sort(compare);
    if(highscoreList[0].score < highscoreList[highscoreList.length-1].score){
      highscoreList.reverse();
    }
  }

  var table = document.getElementById("highscore-table");
  //emty the table
  table.innerHTML = "";

  //fill in with new information
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<u>#</u>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<u>Player</u>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<u>Score</u>";

  if (highscoreList.length < nbrOfPlayersOnHighScore) {
    var highscoreDiff = nbrOfPlayersOnHighScore - highscoreList.length;
    for (var i = 0; i < highscoreDiff; i++) {
      highscoreList.push(nullPlayer);
    }
  }

  for (i = 0; i < nbrOfPlayersOnHighScore; i++) {
    if(highscoreList[i].score < 0){
      highscoreList[i] = nullPlayer;
    }
    if(i == 0){
      var a1 = "<font color=\"#FFFF52\">";
      var a2 = "</font>";
    }else{
      var a1 = "<font color=\"white\">";
      var a2 = "</font>";
    }
    var row = table.insertRow(i+1);
    var cell = row.insertCell(0);
    cell.innerHTML = a1+"<span onclick="+"getUserInfo("+i+")"+">"+(i+1)+"</span>"+a2;

    var cell = row.insertCell(1);
    cell.innerHTML = a1+"<span onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].name+"</span>"+a2;
    var cell = row.insertCell(2);
    cell.innerHTML = a1+"<span onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].score+"</span>"+a2;
  }

};

function compare(player1,player2) {
  if (player1.score < player2.score)
  return -1;
  else if (player1.score > player2.score)
  return 1;
  else
  return 0;
};

function getUserInfo(playerindex){
  var p = highscoreList[playerindex];
  openModalWith(
    "Player info<br>"+
    "<br>Name: "+ p.name+
    "<br>Email: "+ p.email+
    "<br>Score: "+ p.score
  );
};
