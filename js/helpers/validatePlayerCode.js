function isValidPlayerInputCode(){
  var inputCode = JSON.parse(localStorage['currentPlayer']).code;
	var functionForRunning = "runPlayer(lastBananaHit, opponent, wind, memory)";
  var codeOutsideLimit = "localStorage";

	if (inputCode.indexOf(functionForRunning) == -1) {
			openModalWith("<h3>ERROR</h3>Your code must contain:<br>"+functionForRunning);
			return false;
	}
	if (inputCode.indexOf(codeOutsideLimit) !==   -1) {
			openModalWith("<h3>ERROR</h3>Use of forbidden resources");
			return false;
	}
	try {
		eval(inputCode);
	} catch (e) {
			if (e instanceof SyntaxError) {
					openModalWith("<h3>ERROR</h3>"+e);
					return false;
			}
	}
  return true;
}
