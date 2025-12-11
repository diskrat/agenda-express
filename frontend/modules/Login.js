const validator = require('validator')
export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }
    init() {
        console.log('hey')
        this.events();
    }
    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            this.validate(e);
        });
    }
    validate(e) {
        // use currentTarget to reliably reference the form that the listener is bound to
        const el = e.currentTarget || e.target;
        let valid = true

        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');
        // mail: guard element existence before reading .value
        if (!email || !email.value || !email.value.trim()) {
            if (email) {
                this.setInvalid(email, 'Email é obrigatório');
            } else {
                console.warn('Login.validate: email input not found');
            }
            valid = false;
        } else if (!validator.isEmail(email.value)) {
            this.setInvalid(email, 'Formato de email inválido');
            valid = false;
        } else {
            this.setValid(email);
        }
        // pass: guard element existence and use trimmed length
        if (!password || !password.value || !password.value.trim()) {
            if (password) {
                this.setInvalid(password, 'Senha é obrigatória');
            } else {
                console.warn('Login.validate: password input not found');
            }
            valid = false;
        } else {
            const passVal = password.value.trim();
            const passlen = passVal.length;
            if (passlen < 3 || passlen > 50) {
                this.setInvalid(password, 'Senha deve estar entre 3 e 50 caracteres');
                valid = false;
            } else {
                this.setValid(password);
            }
        }
        if(!valid) {
            e.preventDefault();
            e.stopPropagation();
            this.form.classList.add('was-validated');
        }
        console.log(valid)
    }
    
    setInvalid(input, msg){
        input.classList.add('is-invalid');
        let div = input.nextElementSibling;
        if (!div) {
            div = document.createElement('div');
            div.className = 'invalid-feedback';
            input.insertAdjacentElement('afterend', div);
        }
        console.log(div);
        div.textContent = msg;
    }
    setValid(input) {
        input.classList.remove('is-invalid');
        const div = input.parentNode.querySelector('.invalid-feedback');
        if (div) div.remove();
    }
}