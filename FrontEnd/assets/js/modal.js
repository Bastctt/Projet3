const userToken = sessionStorage.getItem("userToken");
sessionStorage.setItem('userToken', data.token);

if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}