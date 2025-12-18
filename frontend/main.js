import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';

// pass valid CSS selectors (class selectors) so QuerySelector finds the forms
const login = new Login('.form-login');
const register = new Login('.form-cadastro');
// enable Bootstrap custom validation for all forms with .needs-validation
window.addEventListener('load', () => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // initialize class-based form validators after DOM is ready
  login.init();
  register.init();

});

