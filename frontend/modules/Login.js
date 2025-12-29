const validator = require('validator')

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }
    init() {
        this.events();
    }
    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }
    validate(e) {
        const el = e.target;
        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');
        console.log(email.value)
        console.log(password.value)
        let error = false;
        this.cleanUp();
        if (!validator.isEmail(email.value)) {
            error = true;
            this.errorMsg('E-mail invalido', email);
        }
        if (password.value.length < 3 || password.value.length > 50) {
            error = true;
            this.errorMsg('senha nao entre 3 e 50', password);
        }
        if (!error) el.submit();
    }
    errorMsg(msg, ref) {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger', 'validate')
        div.innerText = msg
        ref.after(div)
    }
    cleanUp() {
        const errors = document.querySelectorAll('.validate')
        errors.forEach(error => error.remove())
    }
}