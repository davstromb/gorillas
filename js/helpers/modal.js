var audioButton = new Audio('audio/select.wav');
var modal;

function openModal(modalId){
  audioButton.play();
  modal = document.getElementById(modalId);
  modal.style.display = 'block';
};

function closeModal(modalId){
  modal = document.getElementById(modalId);
  modal.style.display = 'none';
};

function openModalWith(modalMsg){
  document.getElementById('message_modal_content').innerHTML = modalMsg;
  openModal('message_modal');
};
