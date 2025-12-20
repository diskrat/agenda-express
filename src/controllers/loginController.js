const Login = require('../models/loginModel');
exports.index = (req, res) => {
  if (req.session.user) {
    return res.render('login-logado')
  } else {
    req.session.user = {}
  };
  res.render('login');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login/index'));
      return;
    }
    req.flash('success', 'usuario criado com sucesso');
    req.session.save(() => res.redirect('/login/index'));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();
    req.session.user = login.user || {};
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login/index'));
      return;
    }
    req.flash('success', 'Usuario logado com sucesso');
    req.session.save(() => res.redirect('/login/index'));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
