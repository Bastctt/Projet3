initialisation();

function initialisation(){
    getProjects();
    getCategories();
}

function getProjects(){
    fetch('http://localhost:5678/api/works')
    .then((res)=> res.json())
    .then(projects=>
        displayProjects(projects)
    );
    
}

function getCategories(){
    fetch('http://localhost:5678/api/categories')
    .then((res)=> res.json())
    .then(categories=>
        displayCategories(categories)
    );
}

const figures = [];

function displayProjects(projects){
    
    projects.forEach(element => {
        console.log(element)
        

        let figure = document.createElement('figure');
        figure.setAttribute("id", element.categoryId)
        let img = document.createElement('img');
        img.setAttribute('src',element.imageUrl);
        img.setAttribute('alt', element.title);

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(img)
        figure.appendChild(figcaption)
        figure.push(figure);
        

        document.querySelector('.gallery').appendChild(figure);
    });

}

const elementsFilter = document.querySelector(". filtres button");
const all = document.querySelector(".all");
const button = document.querySelector("button");

    button.forEach(button => {
        button.addEventListener('click', function (){
            for (let e of button){
                e.classList.remove(".active");
            }
            button.classList.add(".active");        
        });
    });

    figure.forEach(figure => { {
        if (
            figure.getAttribute("data-category-id") ===
            button.getAttribute("data-category-id")
        ){
            figure.style.display = "block";

        }   else if (button==all){
            figure.stytle.display = "block";
        } 
            else {
            figure.style.display = "none";
        }
        };
    
    });
