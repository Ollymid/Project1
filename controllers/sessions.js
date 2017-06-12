const User = require('../models/user');


function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log('user found by mongoose using the email', user);
      if(!user || !user.validatePassword(req.body.password)) {
        return res.unauthorized('/login', 'Unknown person');
      }

      req.session.userId = user.id;
      req.session.isAuthenticated = true;

      req.user = user;

      req.flash('success', `Hi, ${user.username}!`);
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
