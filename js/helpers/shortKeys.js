var isAltPressed = false;
window.addEventListener("keydown", function (event) {
  if (event.keyCode !== undefined) {
    if (!isAltPressed && event.keyCode == 18) {
      isAltPressed = true;
      return;
    }else if(!isAltPressed){
      return;
    }

    if (event.keyCode == 79) { // o
      document.getElementById('message_modal').style.display = 'none';
      document.getElementById('api_info').style.display = 'none';
    }
    else if (event.keyCode == 67) { // c
       clearPlayerCode();
    }
    else if (event.keyCode == 76) { // l
      openModal('load_player_modal');
    }
    else if (event.keyCode == 78) { // n
      openModal('new_player');
    }
    else if (event.keyCode == 65) { // a
      openModal('api_info');
    }
    else if (event.keyCode == 82) { // r
      openModalWith(RulesModalText);
    }
    else if (event.keyCode == 83) { // s
      savePlayerCode();
    }
    else if (event.keyCode == 71) { // g
      resetPlayerCode();
    }
    else if (event.keyCode == 80) { // p
      document.getElementById('play').click();
    }
    isAltPressed = false;
  }
}, true);
