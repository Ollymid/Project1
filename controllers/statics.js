const User = require('../models/user');

function indexStatics(req, res, next) {
  User
   .find()
   .exec()
   .then((users)  => res.render('statics/index', { users }))
   .catch(next);
}

module.exports = {
  index: indexStatics
};
