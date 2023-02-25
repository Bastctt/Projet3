const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#motDePasse').value;

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
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
      localStorage.setItem('userToken', data.token)
      window.location.href = 'index.html';
    })
    .catch(error => {
      // Erreur lors de la connexion, afficher un message d'erreur
      console.error(error);
    });
  } else {
    // Email ou mot de passe incorrects, afficher un message d'erreur
    alert('Email ou mot de passe incorrects');
  }
});


