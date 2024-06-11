const clearRegisterError = () => {
  const registerError = document.getElementById('registerError');
  registerError.innerHTML = '';
};

const showRegisterError = (message) => {
  const registerError = document.getElementById('registerError');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-danger" role="alert">
      <b>Registration failed.</b> ${message}
    </div> 
  `;
  registerError.append(wrapper);
};

const validatePasswordStrength = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const favoriteColorField = document.getElementById('favoriteColor');
  const favoriteSongField = document.getElementById('favoriteSong');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearRegisterError();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    } else {
      const firstName = firstNameField.value;
      const lastName = lastNameField.value;
      const email = emailField.value;
      const password = passwordField.value;
      const confirmPassword = confirmPasswordField.value;
      const favoriteColor = favoriteColorField.value;
      const favoriteSong = favoriteSongField.value;

      if (localStorage.getItem(email)) {
        showRegisterError('A user with that email has already registered.');
        emailField.classList.add('is-invalid');
        return;
      }

      if (!validatePasswordStrength(password)) {
        showRegisterError(
          'Password must be at least 8 characters long, contains at least one uppercase letter, one lowercase letter, and one number.'
        );
        passwordField.classList.add('is-invalid');
        return;
      }

      if (password !== confirmPassword) {
        showRegisterError('Passwords do not match.');
        confirmPasswordField.classList.add('is-invalid');
        return;
      }

      const user = {
        firstName,
        lastName,
        email,
        password,
        favoriteColor,
        favoriteSong,
      };

      localStorage.setItem(email, JSON.stringify(user));
      window.location.href = '../index.html';
    }
  });

  const validateField = (field) => {
    if (field.checkValidity()) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    }
  };

  const addValidationListeners = (field) => {
    field.addEventListener('input', clearRegisterError);
    field.addEventListener('blur', () => validateField(field));
  };

  const validatePasswordOnBlur = (field) => {
    field.addEventListener('blur', () => {
      if (!validatePasswordStrength(field.value)) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
        clearRegisterError();
      }
    });
  };

  const validateConfirmPasswordOnBlur = (field) => {
    field.addEventListener('blur', () => {
      if (field.value !== passwordField.value) {
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
        clearRegisterError();
      }
    });
  };

  addValidationListeners(firstNameField);
  addValidationListeners(lastNameField);
  addValidationListeners(emailField);
  addValidationListeners(passwordField);
  addValidationListeners(confirmPasswordField);
  addValidationListeners(favoriteColorField);
  addValidationListeners(favoriteSongField);

  validatePasswordOnBlur(passwordField);
  validateConfirmPasswordOnBlur(confirmPasswordField);
});
