// Sélection des éléments HTML
const modalBody = document.querySelector('.modal_body');
const edit3Btn = document.querySelector('.edit3Btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.myModal');
const closeBtn = document.querySelector('.closeBtn');

// Récupération des données via une requête fetch
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    // Boucle sur les données reçues pour créer des éléments HTML
    data.forEach(work => {
      // Création d'une div pour chaque image
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('image-container');

      // Création de l'élément img
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.width = 78.88;
      img.height = 105.34;

      // Ajout de l'élément img à la div
      imgDiv.appendChild(img);

      // Création d'un élément p pour le lien "éditer"
      const editLink = document.createElement('p');
      editLink.textContent = 'éditer';

      // Ajout de l'élément p à la div
      imgDiv.appendChild(editLink);

      // Création d'un élément span pour l'icône de poubelle
      const deleteIcon = document.createElement('span');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can deleteIcon"></i>';

      // Ajout de l'élément span à la div
      imgDiv.appendChild(deleteIcon);

      // Ajout de la div à la modal
      modalBody.appendChild(imgDiv);

      // Ajout d'un événement click sur l'icône de poubelle pour supprimer le travail
      deleteIcon.addEventListener('click', function () {
        // Requête fetch pour supprimer le travail
        fetch(`http://localhost:5678/api/works/${work.id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            // Suppression de la div correspondante
            imgDiv.remove();
          })
          .catch(error => console.error(error));
      });
    });
  })
 // Ajout des événements click sur les boutons "éditer" et "fermer"
edit3Btn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});









