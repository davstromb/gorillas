function executeTurn(otherPlayerPos, hitPos, wind) {
	var code = JSON.parse(localStorage['runningGamePlayer']).code;

	var bananaHitPos = hitPos;
	var opponentAsJson = new Object();
  		opponentAsJson['x'] = otherPlayerPos[0];
  		opponentAsJson['y'] = otherPlayerPos[1];
	var windCopy = wind;
	var funName = "player" + Date.now();

	eval(code);

	var playerReturn = runPlayer(bananaHitPos, opponentAsJson, windCopy, agent_memory);
	agent_angle = validateAngle(playerReturn['angle']);
	agent_force = validateForce(playerReturn['velocity']);
	agent_memory = playerReturn['memory'];
}

// basically player will die if values are not correct
function validateAngle(angle){
	if(!isNumber(angle)){
			return 270;
	}else if(angle < 0 || angle > 360){
		return 270;
	}else{
		return angle;
	}
}

// basically player will die if values are not correct
function validateForce(force){
	if(!isNumber(agent_force) || agent_force > 150){
		return 0;
	}else{
		return force;
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
