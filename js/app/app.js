highscoreTableUpdate();
define(['objects/wind', 'objects/sun', 'objects/building', 'objects/gorilla'],
function(Wind, Sun, Building, Gorilla) {

  function App() {
    this.audioHit = new Audio('audio/hit.ogg');
    this.audioHitSun = new Audio('audio/select.wav');
    this.audioGameOver = new Audio('audio/winner.ogg');
    this.audioNewRound = new Audio('audio/level-up.ogg');

    this.maximumNumberOfTurns = 10;
    this.roundsInGame = 3;
    this.empty = true;
    this.canvas = document.getElementById('canvas');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.sunShock = false;
    this.rounds = 1;
    this.scores = {player_1: 0,player_2: 0};
    this.turnsLeft = {player_1: 0,player_2: 0};
    this.buildings = [];
    this.frameRate = 15;
    this.wind = new Wind(this.context);
    this.updateScoreBoard();
  }


  /**
  * createScene: Sets up and rerenders the main scene
  */
  App.prototype.createScene = function() {
    this.clear();
    this.createSun();
    if (this.empty) {
      this.empty = false;
      this.createBuildings();
      this.createGorillas();
      this.wind = new Wind(this.context);
    } else {
      this.reCreateBuildings();
      this.reCreateColissions();
      this.reCreateGorillas();
    }
    this.wind.create();
  };

  /**
  * createBuildings: Begins building construction
  * We continue to build until we reach the end of the screen
  */
  App.prototype.createBuildings = function() {
    var position = 0;
    while (position < this.width) {
      var building = this.createBuilding(position);
      position = building.endPosition();
    }
  };

  /**
  * createBuilding: Builds individual building
  * param {Integer} x The position to start building
  * returns {Object} building Returns a new building object
  */
  App.prototype.createBuilding = function(x) {
    var building = new Building(this.context, this.height);
    var y = Math.floor(Math.random() * 150);
    building.create(x, y);
    this.buildings.push(building);
    return building;
  };

  /**
  * reCreateBuildings: start re-creating our buildings
  */
  App.prototype.reCreateBuildings = function() {
    for (var i = 0; i < this.buildings.length; i++) {
      this.buildings[i].reCreate();
    }
  };

  /**
  * reCreateCollions: start re-creating our destruction
  */
  App.prototype.reCreateColissions = function() {
    for (var i = 0; i < this.buildings.length; i++) {
      this.buildings[i].reCreateColissions();
    }
  };

  /**
  * createSun: Builds the happy/shocked sun
  */
  App.prototype.createSun = function() {
    var sun = new Sun(this.context);
    if (this.sunShock) {
      sun.create(true);
    } else {
      sun.create();
    }
  };

  /**
  * clear: Reset the canvas
  */
  App.prototype.clear = function() {
    return this.canvas.width = this.canvas.width;
  };

  /**
  * clearTimeout: does what it says
  */
  App.prototype.clearTimeouts = function() {
    clearTimeout(this.timeout);
  };

  /**
  * createGorillas: Builds out Player_1 && Player_2
  */
  App.prototype.createGorillas = function() {
    var buildingOnePosition, buildingTwoPosition, building;

    // Build and position Player_1
    buildingOnePosition = Math.floor(Math.random() * this.buildings.length / 2);
    building = this.buildings[buildingOnePosition];
    this.player_1 = new Gorilla(this.context, 1);
    this.player_1.create(building.middlePosition(), building.positionAtY());

    // Build and position Player_2
    buildingTwoPosition = Math.floor(Math.random() * (this.buildings.length - 2 - buildingOnePosition)) + buildingOnePosition + 1;
    building = this.buildings[buildingTwoPosition];
    this.player_2 = new Gorilla(this.context, 2);
    this.player_2.create(building.middlePosition(), building.positionAtY());
  };

  /**
  * reCreateGorillas: Re-Build players on reCreate
  */
  App.prototype.reCreateGorillas = function() {
    this.player_1.reCreate();
    this.player_2.reCreate();
  };

  /**
  * throwBanana: Start the banana animation
  */
  App.prototype.throwBanana = function(force, angle, player) {
    var that = this;
    if (player === 2) {
      angle = -angle;
      force = -force;
    }
    player = this['player_' + player];
    player.getBanana(force, angle, this.wind.windSpeed);
    this.timeout = setTimeout(function() {
      that.startTime = new Date();
      that.animateBanana(player, that.startTime);
    }, this.frameRate);
    agent_2_memory.lastThrow = undefined;
    return 5;
  };

  /**
  * animateBanana: Draw the banana across the screen until we have hit something
  */
  App.prototype.animateBanana = function(player) {
    var that, now, time;
    that = this;

    this.timeout = setTimeout(function() {
      that.createScene();
      if (that.bananaHitSun(player)){
        that.updateHitSunScore(player.playerNumber);
        that.nextPlayerTurn(player);
        return;
      }
      if (that.bananaHitGorilla(player)){
        return;
      }
      if (that.bananaHasHit(player)) {
        that.nextPlayerTurn(player);
        return;
      }
      if (that.withinBoundries(player.banana.x(), player.banana.y()) === false) {
        that.nextPlayerTurn(player);
        return;
      }
      now = new Date();
      time = now - that.startTime;

      player.throwBanana(time / 1000);
      that.animateBanana(player);
    }, this.frameRate);
  };

  /**
  * bananaHitSun: Check if the banana has passed through the sun
  */
  App.prototype.bananaHitSun = function(player) {
    var x = player.banana.x();
    var y = player.banana.y();
    if (x <= (this.width / 2) + 10 && x >= (this.width / 2) - 10 && y <= 27 && y >= 17) {
      return true;
    }
    return false;
  };

  /**
  * bananaHasHit: Did we hit something?
  */
  App.prototype.bananaHasHit = function(player) {
    var x = player.banana.x();
    var y = player.banana.y();
    for (var i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].checkColission(x, y)){
        this.audioHit.play();
        return true;
      }
    }
    return false;
  };


  /**
  * bananaHitGorilla: Check if banana has hit a player
  */
  App.prototype.bananaHitGorilla = function(player) {
    var that = this;
    var x = player.banana.x();
    var y = player.banana.y();
    if (this.player_2.checkColission(x, y) || this.player_1.checkColission(x, y)) {
      var winner = (this.player_2.dead === false) ? this.player_2 : this.player_1;
      that.updateHitGorillaScore(winner.playerNumber);
      this.timeout = setTimeout(function() {
        that.startTime = new Date();
        winner.animate = true;
        that.createScene();
        player.animateWin();
        that.animateWin(winner, that.startTime);
      }, this.frameRate);

      var deadPlayer = (this.player_2.dead === true) ? this.player_2 : this.player_1;
      this.timeout = setTimeout(function() {
        that.animateColission(deadPlayer);
      }, 5);

      that.goToNextRound();
      return true;
    }else{
      return false;
    }
  };

  /**
  * animateColission: fire off explosson
  */
  App.prototype.animateColission = function(player) {
    var that = this;
    this.timeout = setTimeout(function() {
      that.startTime = new Date();
      player.animateColission();
      if (player.explosionWidth < player.width) that.animateColission(player);
    }, 0);
  };

  /**
  * animateWin: Lets make that Gorilla Dance
  */
  App.prototype.animateWin = function(player, startTime) {
    var that = this;
    this.turnsLeft = {player_1: 0,player_2: 0};
    this.startTime = startTime;
    this.timeout = setTimeout(function() {
      while (!(player.animate === true && player.animations < 12)) {
        that.empty = true;
        that.buildings = [];
        that.createScene();
        that.nextPlayerTurn(player);
        return;
      }
      var now = new Date();
      var time = now - that.startTime;
      that.createScene();
      player.animateWin();
      that.animateWin(player, that.startTime);
    }, 500);
  };

  App.prototype.goToNextRound = function(){
    this.rounds++;
    if (this.rounds > this.roundsInGame) {
      isGameRunning = false;
      this.rounds = 1;
      this.saveToHighscoreList();
      this.audioNewRound.play();
    }else{
      this.audioGameOver.play();
    }
    this.updateScoreBoard();
  };

  /**
  * nextPlayerTurn: change turns
  * params {Object} player Pass in the current player
  */
  App.prototype.nextPlayerTurn = function(player) {
    this.sunShock = false;
    player.timer = 0;
    var nextPlayer = (player.playerNumber === 2) ? 1 : 2;

    this.turnsLeft['player_' + player.playerNumber]++;
    this.updateThrows(this.turnsLeft['player_' + player.playerNumber]);
    if(!isGameRunning) {
      return;
    }
    if (this.turnsLeft['player_' + player.playerNumber] <= this.maximumNumberOfTurns) {
      this.runPlayer(nextPlayer);
    } else {
      this.empty = true;
      this.buildings = [];
      this.createScene();
      this.turnsLeft = {player_1: 0,player_2: 0};
      this.goToNextRound();
      this.updateScoreBoard();
      this.nextPlayerTurn(player);
    }
  };

  App.prototype.runPlayer = function(player) {
    var playerWind = this.wind.windSpeed;
    var deltaX = this.player_2.x - this.player_1.x;
    var deltaY = this.player_1.y - this.player_2.y;
    var playerPos = [deltaX, deltaY];

    if (player == 1) {

        var bHP = new Object();
        bHP['x'] = null;
        bHP['y'] = null;

        if (this.player_1.banana) {
          bHP['x'] = this.player_1.banana.x() - this.player_1.x;
          bHP['y'] = this.player_1.banana.y() - this.player_1.y ;
        }


      executeTurn(playerPos, bHP, playerWind);
      this.throwBanana(agent_force, agent_angle, player);
    } else {
      runAgent(2, playerPos, [2, 2]);
      this.throwBanana(agent_2_force, agent_2_angle, player);
    }
  };

  /**
  * withinBoundries: Lets see if the banana is still within the playing field
  */
  App.prototype.withinBoundries = function(x, y) {
    return (x < 0 || x > this.width || y > this.height) ? false : true;
  };

  App.prototype.updateHitSunScore = function(player){
    var that = this;

    var playerNumber = 'player_' + player;

    var ps = this.scores[playerNumber];

    if(ps > 0) {
        ps = ps + 10;
    } else {
      ps = 10;
    }

    this.scores[playerNumber] = ps;
    this.audioHitSun.play();
    this.sunShock = true;
    this.updateScoreBoard();
  };

  App.prototype.updateHitGorillaScore = function (playerNumber) {
    this.scores['player_' + playerNumber] += 10 - this.turnsLeft['player_' + playerNumber];
    this.updateScoreBoard();
  };

  App.prototype.openGameOverModal = function(name,scoreToSave){
    var text = "<h3>Game Over!</h3>";
    if(scoreToSave > 0){
      text += "The winner is "+name+"<br>Score: "+scoreToSave;
    }else if(scoreToSave == 0){
      text += "DRAW...";
    }else{
      text += "The winner is CPU<br>Score: "+(-scoreToSave);
    }

    openModalWith(text);
    document.getElementById('new_player_btn').disabled = false;
    document.getElementById('play').disabled = false;
    document.getElementById('stop').disabled = true;
  };

  App.prototype.saveToHighscoreList = function(){
    var scoreToSave = this.scores['player_1'] - this.scores['player_2'];
    var runningGamePlayer = JSON.parse(localStorage['runningGamePlayer']);
    var jsonToSave = {
      'name' : runningGamePlayer.name ,
      'email': runningGamePlayer.email,
      'score': scoreToSave,
      'code' : runningGamePlayer.code
    };

    var highscoreList = JSON.parse(localStorage['highscoreList']);
    highscoreList.push(jsonToSave);
    localStorage['highscoreList'] = JSON.stringify(highscoreList);
    highscoreTableUpdate();
    this.openGameOverModal(runningGamePlayer.name,scoreToSave);

    document.getElementById('play').disable = false;
    //this.saveHighscoreToFile(highscoreList);
  };

  App.prototype.updateScoreBoard = function() {
    document.getElementById('player_2_score').innerHTML=this.scores.player_2;
    document.getElementById('player_1_score').innerHTML=this.scores.player_1;
    document.getElementById('round_nr').innerHTML=this.rounds;
  };
  App.prototype.updateThrows = function(nbr) {
    document.getElementById('throw_nr').innerHTML=nbr;
  };

  App.prototype.saveHighscoreToFile = function(highscoreList){
    var textToSave = JSON.stringify(highscoreList);
    var filename = 'scores-'+Date.now()+".json";
    var doc1 = document.createElement('a');
    doc1.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(textToSave));
    doc1.setAttribute('download', filename);
    doc1.click();
  };

  return App;
});
