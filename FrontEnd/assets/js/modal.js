const modalBody = document.querySelector('.modal_body');
const edit3Btn = document.querySelector('.edit3Btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.myModal');
const closeBtn = document.querySelector('.closeBtn');

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const modalBody = document.querySelector(".modal_body");
    data.forEach(work => {
      // Créer une div pour chaque image
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('image-container');
      // Créer l'élément img
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.width = 78.88;
      img.height = 105.34;
      // Ajouter l'élément img à la div
      imgDiv.appendChild(img);
      // Créer un élément p
      const editLink = document.createElement('p');
      // Ajouter du texte à l'élément p
      editLink.textContent = 'éditer';
      // Ajouter l'élément p à la div
      imgDiv.appendChild(editLink);
      // Ajouter un élément span pour l'icône de poubelle
      const deleteIcon = document.createElement('span');
      deleteIcon.classList.add('delete-icon');
      // Ajouter l'icône de poubelle dans l'élément span
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can deleteIcon"></i>';
      // Ajouter l'élément span à la div
      imgDiv.appendChild(deleteIcon);
      // Ajouter la div à la modal
      modalBody.appendChild(imgDiv);
    });
  })
  .catch(error => console.error(error));

edit3Btn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});





