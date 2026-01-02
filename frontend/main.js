import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login'
import Contato from './modules/Contato'

const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')

const contatoEdit = new Contato('.form-edit-contato')
const contatoReg = new Contato('.form-reg-contato')

login.init()
cadastro.init()
contatoEdit.init()
contatoReg.init()

