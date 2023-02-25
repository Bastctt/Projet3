getWorks(); // Je lance ma fonction, important sinon il se passe rien

async function getWorks() {//Je crée une fonction asynch (ça permet que la fonction ne bloque pas toute la page, elle sera lu uniquement quand elle aura fini de se charger)
  // Variables travaux
  const gallery = document.querySelector(".gallery"); //Je veux dans mon document html l'élement qui à la classe "gallery" (donc ta div gallery)  
  const figures = []; //Je crée ici un tableau pour pouvoir utilser mes figures à l'extérieur de ma fonction getWorks()
  // Variables filtres
  const filtres = document.querySelectorAll(".filtres button"); //Je veux dans mon document html TOUS les button qui sont dans l'élement qui à la classe "filtres"
  const all = document.querySelector(".all");

  const buttons = document.querySelectorAll("button");

  // ETAPE 1 Appel des travaux via l'API avec la methode GET
  let tonApi = "http://localhost:5678/api/works";

  try {
    //Dans try je dis ce qu'il se passe si je reçois mon API
    const response = await fetch(tonApi); // Je crée une variable response quand fetch a terminé de recuperer l'api, response est égale aux données de l'api
    const works = await response.json(); //  Je crée une variable works quand response a fini de se transformer en objet json, works est égale à response, donc aux données de l'api, mais cette fois-ci sous forme "d'objet manipulable"

    for (let i in works) {
      // => Pour chaque éléments DANS works je fais :
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.setAttribute("src", works[i].imageUrl);
      img.setAttribute("alt", works[i].title);
      img.setAttribute("cross-origin", "anonymous");
      
      figcaption.innerHTML = works[i].title;

      figure.append(img, figcaption); //J'ajoute img PUIS figcaption dans figure
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
  //Pour chaque bouton de filtres je fais :

  button.addEventListener("click", function () {

  for (let figure of figures) {
      if (
          figure.getAttribute("data-id") === button.getAttribute("data-id") //Si la valeur de l'attribut "data-id" de figure est égale à la valeur de l'attribut "data-id" du bouton 
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








  
        
    

  











