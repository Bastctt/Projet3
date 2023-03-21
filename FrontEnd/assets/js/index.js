init();

function init(){
  getWorks(); 
  isUserConnected();
}


async function getWorks() {
  // Variables travaux
  const gallery = document.querySelector(".gallery");   
  const figures = []; 
  // Variables filtres
  const filtres = document.querySelectorAll(".filtres button"); 
  const all = document.querySelector(".all");

  const buttons = document.querySelectorAll("button");

  
  let tonApi = "http://localhost:5678/api/works";

  try {
    
    const response = await fetch(tonApi); 
    const works = await response.json(); 

    for (let i in works) {

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.setAttribute("src", works[i].imageUrl);
      img.setAttribute("alt", works[i].title);
      img.setAttribute("cross-origin", "anonymous");
      
      figcaption.innerHTML = works[i].title;

      figure.append(img, figcaption);
      figure.setAttribute("data-id", works[i].categoryId);
      gallery.append(figure);
      figures.push(figure);
      console.log(works)
    }
  } catch (error) {
    console.error(" Attention il y a une erreur");
  }
  // Filtrage des travaux

  for (let button of filtres) {
  
  button.addEventListener("click", function () {

  for (let figure of figures) {
      if (
          figure.getAttribute("data-id") === button.getAttribute("data-id") 
      ) {
        figure.style.display = "block";
    
      } else if(button === all){ 
          figure.style.display = "block";
      }
      else {
        figure.style.display = "none";
      }
    }
    });
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(button => {
          button.style.backgroundColor = "#FFFEF8";
          button.style.color = "#1D6154";
        });
        button.style.backgroundColor = "#1D6154";
        button.style.color = "#FFFEF8";
      });
    });
  }
}

function isUserConnected(){
const modifyBtn = document.querySelectorAll('.modale-bloc');
const filtres = document.querySelector('.filtres');
console.log(sessionStorage.userToken)
  if(sessionStorage.userToken){
    let loginLink = document.getElementById('login-link');
    loginLink.innerHTML = "logout";
    let url = loginLink.getAttribute('href') + '?logout=true';
    loginLink.setAttribute('href', url);
    modifyBtn.forEach(element=>{
      element.classList.remove('display-none');
      filtres.classList.add('hidden');
    })
  }
}