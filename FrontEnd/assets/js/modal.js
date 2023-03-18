const editBtn = document.querySelector('.editBtn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.myModal');
const closeBtn = document.querySelector('.closeBtn');

editBtn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});

});

