const params = new URLSearchParams(document.location.search);

if(params.get('logout')){
  sessionStorage.removeItem('userToken');
  window.location.href = 'index.html';
}
else{
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#motDePasse').value.trim();
    
    
    if (email.length > 0 && password.length > 0) {
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        // Connexion réussie, faire quelque chose ici (ex: redirection vers une autre page)
        console.log(data);
        if(data.message ==='user not found'){
          alert('Email ou mot de passe incorrects');
        }else{
          sessionStorage.setItem('userToken', data.token);
          window.location.href = 'index.html';
      }
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // Email ou mot de passe incorrects, afficher un message d'erreur
      alert('Merci de saisir un mot de passe et une adresse mail valide');
    }
  });
}





















  /*
// récupère le token de l'utilisateur depuis sessionStorage
const userToken = sessionStorage.getItem("userToken");

// fonction pour mettre à jour le lien de connexion/logout
function updateLoginLink() {
  const loginLink = document.getElementById("login-link");

  if (userToken) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "login.html";
  }
}

// appelle la fonction pour mettre à jour le lien au chargement de la page
updateLoginLink();

// ajoute un écouteur d'événement sur le lien pour déconnecter l'utilisateur
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", function() {
  if (userToken) {
    // supprime le token de sessionStorage pour déconnecter l'utilisateur
    sessionStorage.removeItem("userToken");

    // met à jour le lien de connexion/logout
    updateLoginLink();
  }
});
*/