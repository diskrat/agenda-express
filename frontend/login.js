// Custom Login validation module
// Usage: import { initLoginValidation } from './login';
// initLoginValidation(selector, rules)

export function initLoginValidation(selector = '.form-login', rules = {}) {
  const form = document.querySelector(selector);
  if (!form) return;

  form.addEventListener('submit', function (event) {
    let valid = true;

    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');

    // Email validation: prefer browser's built-in validation when requested
    if (email && rules.email) {
      const val = (email.value || '').trim();
      // If caller requests browser validation or no custom pattern provided, use input.checkValidity()
      const useBrowser = rules.email.useBrowser === true || !rules.email.pattern;
      if (rules.email.required && !val) {
        setInvalid(email, rules.email.messages?.required || 'Email é obrigatório');
        valid = false;
      } else if (useBrowser) {
        // rely on HTML5 email validation (type="email")
        if (!email.checkValidity()) {
          // prefer typeMismatch message if available
          const msg = rules.email.messages?.pattern || (email.validity && email.validity.typeMismatch ? 'Formato de email inválido' : 'Email inválido');
          setInvalid(email, msg);
          valid = false;
        } else {
          setValid(email);
        }
      } else if (rules.email.pattern && !rules.email.pattern.test(val)) {
        setInvalid(email, rules.email.messages?.pattern || 'Formato de email inválido');
        valid = false;
      } else {
        setValid(email);
      }
    }

    // Password validation
    if (password && rules.password) {
      const val = password.value || '';
      if (rules.password.required && !val) {
        setInvalid(password, rules.password.messages?.required || 'Senha é obrigatória');
        valid = false;
      } else if (rules.password.minLength && val.length < rules.password.minLength) {
        setInvalid(password, rules.password.messages?.minLength || `Senha precisa ter ao menos ${rules.password.minLength} caracteres`);
        valid = false;
      } else if (rules.password.pattern && !rules.password.pattern.test(val)) {
        setInvalid(password, rules.password.messages?.pattern || 'Senha não atende aos requisitos');
        valid = false;
      } else {
        setValid(password);
      }
    }

    if (!valid) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    }
  });

  function setInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    // find existing invalid-feedback or create one
    let fb = input.nextElementSibling;
    if (!fb || !fb.classList || !fb.classList.contains('invalid-feedback')) {
      fb = document.createElement('div');
      fb.className = 'invalid-feedback';
      input.parentNode.insertBefore(fb, input.nextSibling);
    }
    fb.textContent = message;
  }

  function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}

export default initLoginValidation;
