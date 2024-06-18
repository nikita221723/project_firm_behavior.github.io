// Функция для открытия модального окна
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Функция для закрытия модального окна
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Привязка кнопок к функциям открытия модальных окон
document.getElementById('example1').onclick = function() { //совершенная конкуренция
    openModal('modal1');
}
document.getElementById('example2').onclick = function() {
    openModal('modal2');
}
document.getElementById('example3').onclick = function() {
    openModal('modal3');
}
document.getElementById('example4').onclick = function() {
    openModal('modal4');
}

// Привязка кнопок закрытия к функциям закрытия модальных окон
let closeButtons = document.getElementsByClassName('close');
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        closeModal(this.getAttribute('data-modal'));
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    let modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}