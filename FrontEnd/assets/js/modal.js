// version 2.0
const token = sessionStorage.getItem('userToken');
const work = document.querySelector('figure');
const figure = document.querySelector('.image-container');

init();

function init(){
  envoyerTravail();
  openModal();
  recupererDonnees();
}

function openModal() {

  const edit3Btn = document.querySelector('.edit3Btn');
  const modal = document.querySelector('.myModal');
  const overlay = document.querySelector('.overlay');

  edit3Btn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  const modalFooterButton = document.querySelector('.modal_footer_button');
  const modalAjout = document.querySelector('.modal_ajout');

  modalFooterButton.addEventListener('click', function (e) {
    e.preventDefault();
    modalAjout.style.display = "block";
  });

  const backBtn = document.querySelector('.backBtn');
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modalAjout.style.display = "none";
  });

  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  const closeBtn2 = document.querySelector('.closeBtn2');
   closeBtn2.addEventListener('click', function(e) {
    e.preventDefault();

    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
}


function recupererDonnees() {

  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const modalBody = document.querySelector('.modal_body');
    
    data.forEach(work => {
      // Création des éléments HTML
      const modalBody = document.querySelector('.modal_body');
      const figure = document.createElement('figure');
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
      
      figure.setAttribute('data-id', work.id); // Ajouter l'identifiant unique en tant qu'attribut "data-id"
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.appendChild(deleteIcon);
      modalBody.appendChild(figure);

      deleteIcon.addEventListener('click', function(e) {
        e.preventDefault();
        //const id = figure.getAttribute('data-id'); // Récupérer l'identifiant unique de la figure à supprimer
        console.log(e.target)
        console.log(e.target.closest('figure'))

        SupprimerUnTravail(e);
        // figure.remove(); // Supprimer l'élément HTML correspondant au travail
        // const modal = document.querySelector('.myModal');
        // modal.style.display = 'block !important';
      });
    });
  });
}


function envoyerTravail() {

  const input = document.getElementById('file');

  input.addEventListener('change', (event) => {
    event.preventDefault();

    // Affichage de l'image sélectionnée

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

  const modalFooterValidation = document.querySelector('.modal_footer_validation');

  modalFooterValidation.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    // Récupérer les informations du formulaire

    const titre = document.getElementById('titre').value.trim();
    const categorie = document.getElementById('catégorie').value.trim();
    const image = document.getElementById('file').files[0];

    // Vérifier si tous les champs sont remplis

    if (titre === '' || categorie === '' || !image) {
      const errorMessage = document.getElementById('error-modal');
      errorMessage.style.opacity = '1';
      
      return;
    }

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
    console.log('Projet ajouté !')
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
}


async function SupprimerUnTravail(e) {
  e.preventDefault();
  e.stopPropagation();
  let projectId = e.target.closest('figure').getAttribute('data-id');
  console.log(projectId)

  // const xhr = new XMLHttpRequest();
  // xhr.open('DELETE', `http://localhost:5678/api/works/${projectId}`);
  // xhr.setRequestHeader('Authorization', 'Bearer ' + token)
  // xhr.onreadystatechange = function(e){
  //   e.preventDefault();
  //   let yo = JSON.parse(xhr.responseText);
  //   console.log(yo)
  //   console.log(xhr.status)
  //   return false

  // }
  
  // xhr.send();


  await fetch(`http://localhost:5678/api/works/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':'*/*'
    },
  })
  // .then(response=>response.json())
  .then(async data => {
    console.log('Projet supprimé !');
    console.log(data);

    // Mettre à jour la page d'accueil
    const container = document.querySelector('.gallery');
    const figure = container.querySelector(`[data-id="${data.category}"]`);
    if (figure) {
      figure.remove();
    }
  })
  .catch(error => console.error(error));
}





































