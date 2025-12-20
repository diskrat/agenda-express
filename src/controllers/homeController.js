const Contato = require('../models/contatoModel');
exports.paginaInicial = async (req, res) => {
  const contatos = req.session.user?await Contato.buscaContatos(req.session.user._id):null;
  res.render('index', { contatos });
};
