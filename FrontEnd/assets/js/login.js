// Connexion utilisateur unique

const params = new URLSearchParams(document.location.search);

if (params.get('logout')) {

  sessionStorage.removeItem('userToken');
  window.location.href = 'index.html';

} else {

  const form = document.getElementById('form-login');
  const errorMessage = document.querySelector('#error-message');

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

          if (data.message === 'user not found') {
            errorMessage.style.opacity = '1';
          } 

          else {

            if (data.token) {
              sessionStorage.setItem('userToken', data.token);
              window.location.href = 'index.html';

            } else {
              errorMessage.style.opacity = '1';
            }

          }
        })
        .catch(error => {
          console.error(error);
        });

    } else {
      errorMessage.textContent = 'Merci de saisir une adresse mail et un mot de passe valides.';
      errorMessage.style.opacity = '1';
    }
  });

}






















