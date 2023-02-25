/*const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
*/

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
      window.location.href = 'http'
    })
    .catch(error => {
      // Erreur lors de la connexion, afficher un message d'erreur
      console.error(error);
    });
  } else {
    // Email ou mot de passe incorrects, afficher un message d'erreur
    console.error('Email ou mot de passe incorrects');
  }
});

