if (localStorage.getItem('currentUser')) {
  window.location.href = 'html/user.html';
}

const showLoginError = () => {
  const loginError = document.getElementById('loginError');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <b>Login failed.</b> Please check your username and password and try again.
    </div>
  `;
  loginError.append(wrapper);
};

const clearLoginError = () => {
  const loginError = document.getElementById('loginError');
  loginError.innerHTML = '';
};

const validateField = (field) => {
  if (field.checkValidity()) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  } else {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    } else {
      const email = emailField.value;
      const password = passwordField.value;

      const user = JSON.parse(localStorage.getItem(email));

      if (user && user.password === password) {
        localStorage.setItem('currentUser', email);
        window.location.href = 'html/user.html';
      } else {
        showLoginError();
      }
    }
  });

  const addValidationListeners = (field) => {
    field.addEventListener('input', clearLoginError);
    field.addEventListener('blur', () => validateField(field));
  };

  addValidationListeners(emailField);
  addValidationListeners(passwordField);
});
