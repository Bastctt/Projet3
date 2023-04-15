// version 2.0
const token = sessionStorage.getItem('userToken');
const work = document.querySelector('figure');
const figure = document.querySelector('.image-container');

init();

async function init(){
sendNewWork();
openModal();
closeModal();
 await  getWorks(); }

function openModal() {

  const edit3Btn = document.querySelector('.edit3Btn');
  const modal = document.querySelector('.myModal');
  const overlay = document.querySelector('.overlay');
  const modalFooterButton = document.querySelector('.modal_footer_button');
  const modalAjout = document.querySelector('.modal_ajout');

  edit3Btn.addEventListener('click', function (e) {
    e.preventDefault();

    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  modalFooterButton.addEventListener('click', function (e) {
    e.preventDefault();

    modalAjout.style.display = "block";
  });

  const backBtn = document.querySelector('.backBtn');
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();

    modalAjout.style.display = "none";
  });
}

function closeModal() {

  const modal = document.querySelector('.myModal');
  const overlay = document.querySelector('.overlay');
  const modalAjout = document.querySelector('.modal_ajout');
  const modalBody = modal.querySelector('.modal_body');
  const closeBtn = document.querySelector('.closeBtn');
  const closeBtn2 = document.querySelector('.closeBtn2');
  const form = modalAjout.querySelector('.myForm');
  

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    modal.style.display = 'none';
    overlay.style.display = 'none';
    modalBody.scrollTop = 0; // Réinitialise la position de la scrollbar
    modalAjout.style.display = 'none'; // Réinitialise à la première page
    form.reset();

    console.log("Formulaire réinitialisé !");
  });

  closeBtn2.addEventListener('click', function(e) {
    e.preventDefault();

    modal.style.display = 'none';
    overlay.style.display = 'none';
    modalBody.scrollTop = 0; // Réinitialise la position de la scrollbar
    modalAjout.style.display = 'none'; // Réinitialise à la première page
    form.reset();

    console.log("Formulaire réinitialisé !");
  });
}

async function getWorks() {

  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    
    data.forEach(work => {
      // Création des éléments HTML
      const modalBody = document.querySelector('.modal_body');
      const figure = document.createElement('figure');
      const img = document.createElement("img");
      const figcaption = document.createElement('p');
      const deleteIcon = document.createElement('span');
      const switchIcon = document.createElement('span');
      
      figure.classList.add('image-container');
      img.src = work.imageUrl;
      img.width = 78.88;
      img.height = 105.34;
      figcaption.textContent = 'éditer';
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can deleteIcon"></i>';
      switchIcon.classList.add('switch-icon');
      switchIcon.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right switchIcon"></i>';
      
      figure.setAttribute('data-id', work.id);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.appendChild(deleteIcon);
      figure.appendChild(switchIcon);
      modalBody.appendChild(figure);

      // Ajouter un écouteur d'événements pour le survol de l'image
      figure.addEventListener('mouseenter', function() {
        switchIcon.style.opacity = '1';
      });

      // Ajouter un écouteur d'événements pour lorsque le curseur quitte l'image
      figure.addEventListener('mouseleave', function() {
        switchIcon.style.opacity = '0';
      });

      deleteIcon.addEventListener('click', function(e) {
        e.preventDefault();

        console.log(e.target)
        console.log(e.target.closest('figure'))

       deleteWorks(e);
      });
    });
  });
}


function sendNewWork() {

  const input = document.getElementById('file');

  input.addEventListener('change', (event) => {
    event.preventDefault();

    // Affichage de l'image sélectionnée

    const image = event.target.files[0];
    const preview = document.createElement('img');

    preview.src = URL.createObjectURL(image);
    preview.width = 129;
    preview.height = 169;
    preview.classList.add('preview-image');

    const previewContainer = document.querySelector('.file-input');
    previewContainer.appendChild(preview);

    const label = document.getElementById('buttonAjout');
    const p = document.getElementById('formatPhoto')

    label.style.display = 'none';
    p.style.display = 'none';

  });

  const modalFooterValidation = document.querySelector('.modal_footer_validation');

  modalFooterValidation.addEventListener('mousedown', (event) => {
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

//     // Afficher le travail nouvellement créé sur la page d'accueil

    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    const container = document.querySelector('.gallery');

    figure.setAttribute('data-id', categorie);
    figcaption.textContent = titre;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    container.appendChild(figure);

    const modal = document.querySelector('.myModal');
    // empêcher la fermeture de la modal
    modal.style.display = 'block';

  })
    .catch(error => console.error(error));
  });
}

// Check de la limite de 4mo de l'image
let uploadLimit = document.querySelector("#file")
uploadLimit.onchange = function (){
    if(file.files[0].size > 4194304) {
        alert("Fichier trop volumineux");
        file.value = "";
    }
}

async function deleteWorks(e) {
  e.preventDefault();
  e.stopPropagation();
  let figure = e.target.closest('figure');
  let projectId = figure.getAttribute('data-id');

  const modal = document.querySelector('.myModal');
  // empêcher la fermeture de la modal
  modal.style.display = 'block';

//   // stocker les données de la figure dans le localStorage
  let figureData = {
    id: projectId,
    imageUrl: figure.querySelector('img').src,
    title: figure.querySelector('figcaption'),
    category: figure.getAttribute('data-id')
  };
  let figures = JSON.parse(localStorage.getItem('deletedFigures') || '[]');
  figures.push(figureData);
  localStorage.setItem('deletedFigures', JSON.stringify(figures));

  // masquer la figure
  figure.style.display = 'none';

  // const closeBtn = document.querySelector('.closeBtn');
  // closeBtn.addEventListener('click', async (event) => {
    // event.preventDefault();
    // event.stopPropagation();

  //  // supprimer la figure
      const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
    // });
}







// init();

// function init(){
//   openModal();
//   closeModal();
// }



// function openModal() {

//   const modal = document.querySelector('.myModal');
//   const overlay = document.querySelector('.overlay');
//   const edit3Btn = document.querySelector('.edit3Btn');

//   edit3Btn.addEventListener('click', function (e) {
//   e.preventDefault();
      
//   modal.style.display = 'block';
//   overlay.style.display = 'block';

//   });
//   displayModal();
// }



// function displayModal () {

//   const modalFooterButton = document.querySelector('.modal_footer_button');
//   const modalAjout = document.querySelector('.modal_ajout');
//   const backBtn = document.querySelector('.backBtn');

//   modalFooterButton.addEventListener('click', function (e) {
//     e.preventDefault();
      
//       modalAjout.style.display = "block";

//   });
    
//   backBtn.addEventListener('click', function (e) {
//     e.preventDefault();
      
//       modalAjout.style.display = "none";

//   });
//   getWorks();
// }


// function closeModal() {

//   const modal = document.querySelector('.myModal');
//   const overlay = document.querySelector('.overlay');
//   const modalAjout = document.querySelector('.modal_ajout');
//   const modalBody = modal.querySelector('.modal_body');
//   const closeBtn = document.querySelector('.closeBtn');
//   const closeBtn2 = document.querySelector('.closeBtn2');
//   const form = modalAjout.querySelector('.myForm');
      
    
//   closeBtn.addEventListener('click', function (e) {
//      e.preventDefault();

//     modal.style.display = 'none';
//     overlay.style.display = 'none';
//     modalBody.scrollTop = 0; // Réinitialise la position de la scrollbar
//     modalAjout.style.display = 'none'; // Réinitialise à la première page
//     form.reset();
    
//     console.log("Formulaire réinitialisé !");

//   });
    
//   closeBtn2.addEventListener('click', function(e) {
//     e.preventDefault();
    
//     modal.style.display = 'none';
//     overlay.style.display = 'none';
//     modalBody.scrollTop = 0; // Réinitialise la position de la scrollbar
//     modalAjout.style.display = 'none'; // Réinitialise à la première page
//     form.reset();
    
//     console.log("Formulaire réinitialisé !");

//   });
// }




// // Affichage des travaux

// async function getWorks2() {

//   const gallery = document.querySelector(".gallery");   
//   const figures = []; 

//   let Api = "http://localhost:5678/api/works";

//   try {
    
//     const response = await fetch(Api); 
//     const works = await response.json(); 

//     for (let i in works) {

//       const figure = document.createElement("figure");
//       const img = document.createElement("img");
//       const figcaption = document.createElement("figcaption");

//       img.setAttribute("src", works[i].imageUrl);
//       img.setAttribute("alt", works[i].title);
//       img.setAttribute("cross-origin", "anonymous");
//       figure.setAttribute("data-id", works[i].categoryId);
      

//       figcaption.innerHTML = works[i].title;

//       figure.append(img, figcaption);
//       gallery.append(figure);
//       figures.push(figure);

//     }
//   } catch (error) {
//     console.error(" Attention il y a une erreur");
//   }
// }





























