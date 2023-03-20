const modalBody = document.querySelector('.modal-body');
const edit3Btn = document.querySelector('.edit3Btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.myModal');
const closeBtn = document.querySelector('.closeBtn');

edit3Btn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});




