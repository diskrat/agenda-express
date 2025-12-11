const Contato = require('../models/contatoModel');
exports.paginaInicial = async (req, res) => {
  try {
    // clarity only
    const userId = req.session && req.session.user ? req.session.user._id : null;
    let contatos = [];
    if (userId) {
      contatos = await Contato.buscaContatos(userId);
    }
    res.render('index', { contatos });
  } catch (e) {
    console.log(e);
    res.render('index', { contatos: [] });
  }
};
