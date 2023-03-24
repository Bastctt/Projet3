// Sélection des éléments HTML
const modalBody = document.querySelector('.modal_body');
const edit3Btn = document.querySelector('.edit3Btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.myModal');
const closeBtn = document.querySelector('.closeBtn');
const modalFooterButton = document.querySelector('.modal_footer_button');
const closeBtn2 = document.querySelector('.closeBtn2');
const modalAjout = document.querySelector('.modal_ajout');
const backBtn = document.querySelector('.backBtn');
const token = sessionStorage.getItem('userToken');
const modalFooterValidation = document.querySelector('.modal_footer_validation');

// Récupération des données via une requête fetch
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    // Boucle sur les données reçues pour créer des éléments HTML
    data.forEach(work => {
      const figure = document.createElement('div');
      const img = document.createElement("img");
      const figcaption = document.createElement('p');
      const deleteIcon = document.createElement('span');
      
      figure.classList.add('image-container');
      img.src = work.imageUrl;
      img.width = 78.88;
      img.height = 105.34;
      figcaption.textContent = 'éditer';
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can deleteIcon"></i>';
      
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.appendChild(deleteIcon);
      modalBody.appendChild(figure);

//Envoie d'un nouveau travail avec fetch et post
modalFooterValidation.addEventListener('click', function () {
  fetch("http://localhost:5678/api/works")
    method
})

      
      
// Ajout d'un événement click sur l'icône de poubelle pour supprimer le travail
deleteIcon.addEventListener('click', function () {
        // Requête fetch pour supprimer le travail
  fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${oken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
            // Suppression de la div correspondante
          figure.remove();
        })
        .catch(error => console.error(error));
      });
    });
  })

edit3Btn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');
});

modalFooterButton.addEventListener('click', function () {
  modalAjout.style.display = "block";
});

backBtn.addEventListener('click', function () {
  modalAjout.style.display = "none";
})

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});

closeBtn2.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});


























