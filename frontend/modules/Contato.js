const validator = require('validator')

export default class Contato {
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
        const nome = el.querySelector('input[name="nome"]');
        const sobrenome = el.querySelector('input[name="sobrenome"]');
        const email = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');

        let error = false;
        this.cleanUp();
        if(!nome.value) {
            error = true;
            this.errorMsg('Nome eh obrigatorio',nome);
        }

        if (email.value && !validator.isEmail(email.value)) {
            error = true;
            this.errorMsg('E-mail invalido', email);
        }
        if (telefone.value && !validator.isMobilePhone(telefone.value)){
            error = true;
            this.errorMsg('Telefone invalido', telefone)
        }
        if (!telefone.value && !email.value) {
            error = true;
            this.errorMsg('Preencha email ou telefone', telefone);
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