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
const modalFooterValidation = document.querySelector ('.modal_footer_validation');

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

      // Ajout d'un événement click sur l'icône de poubelle pour supprimer le travail
      deleteIcon.addEventListener('click', function () {
        // Requête fetch pour supprimer le travail
        fetch(`http://localhost:5678/api/works/${work.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
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
  });

//Ecouteurs d'évènements pour la modale

edit3Btn.addEventListener('click', function () {
  overlay.classList.add('visible');
  modal.classList.add('visible');
});

modalFooterButton.addEventListener('click', function () {
  modalAjout.style.display = "block";
});

backBtn.addEventListener('click', function () {
  modalAjout.style.display = "none";
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});

closeBtn2.addEventListener('click', function () {
  modal.classList.remove('visible');
  overlay.classList.remove('visible');
});

//Envoie d'un nouveau travail avec fetch et post

//Affichage de l'image sélectionnée

const input = document.getElementById('file');

input.addEventListener('change', (event) => {

  const image = event.target.files[0];
  const preview = document.createElement('img');

  preview.src = URL.createObjectURL(image);
  preview.width = 129;
  preview.height = 169;

  const previewContainer = document.querySelector('.file-input');
  previewContainer.appendChild(preview);

  const label = document.getElementById('buttonAjout');
  const p = document.getElementById('formatPhoto')

  label.style.display = 'none';
  p.style.display = 'none';
});

modalFooterValidation.addEventListener('click', (event) => {
  event.preventDefault(); 
  
  // Récupérer les informations du formulaire
  const titre = document.getElementById('titre').value;
  const categorie = document.getElementById('catégorie').value;
  const image = document.getElementById('file').files[0];
  
  // Créer un objet FormData pour envoyer les données
  const formData = new FormData();
  formData.append('title', titre);
  formData.append('category', categorie);
  formData.append('image', image);
  
  // Envoyer la requête POST à l'API
  
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Afficher le travail nouvellement créé sur la page d'accueil
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    const container = document.querySelector('.gallery');

    figure.setAttribute('data-id', categorie);
    figcaption.textContent = titre;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    container.appendChild(figure);
  })
  .catch(error => console.error(error));
});

































