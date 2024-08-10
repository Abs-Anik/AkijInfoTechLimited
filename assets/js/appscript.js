const scriptURL = 'https://script.google.com/macros/s/AKfycbxd0VspylVL45MOEObjJylUOa9QhKseph1dA11hJ5eonykSSRpcbtpAgjtkFYOrq12k/exec';
const form = document.forms['contact-form'];
const loadingElement = document.querySelector('.loading');
const errorMessageElement = document.querySelector('.error-message');
const sentMessageElement = document.querySelector('.sent-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  loadingElement.style.display = 'block';
  errorMessageElement.style.display = 'none';
  sentMessageElement.style.display = 'none';

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      loadingElement.style.display = 'none';
      sentMessageElement.style.display = 'block';
      form.reset();
      setTimeout(() => {
        sentMessageElement.style.display = 'none';
      }, 5000); // Hide the success message after 10 seconds
    })
    .catch(error => {
      loadingElement.style.display = 'none';
      errorMessageElement.textContent = `Error: ${error.message}`;
      errorMessageElement.style.display = 'block';
      setTimeout(() => {
        errorMessageElement.style.display = 'none';
      }, 5000); // Hide the error message after 10 seconds
    });
});
