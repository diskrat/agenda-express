const mongoose = require('mongoose');
const validator = require('validator');
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  dono: { type: mongoose.Types.ObjectId, required: true },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }
  async register() {
    this.valida();

    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }
  valida() {
    this.cleanUp();
    // required name
    if (!this.body.nome) this.errors.push('Nome é obrigatório');

    // validate email only when provided
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push('Email inválido');
    }

    // require either email or telefone
    if (!this.body.email && !this.body.telefone) {
      this.errors.push('Preencha email ou telefone');
    }

    if (!validator.isMongoId(this.body.dono)) this.errors.push('Usuario invalido');
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
      dono: this.body.dono,
    };
  }
  static async buscaPorId(id, dono) {
    if (typeof id !== 'string') return;
    const user = await ContatoModel.findOne({ _id: id, dono });
    return user;
  }
  async edit(id, dono) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findOneAndUpdate({ _id: id, dono }, this.body, { new: true });
  }
  static async buscaContatos(dono) {
    const contatos = await ContatoModel.find({ dono }).sort({ criadoEm: -1 });
    return contatos;
  }
  static async delete(id, dono) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id, dono });
    return contato;
  }
}

module.exports = Contato;
