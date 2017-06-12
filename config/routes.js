const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

const trips = require('../controllers/trips');
const users = require('../controllers/users');


const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/trips')
  .get(trips.index)
  .post(secureRoute, trips.create);

router.route('/trips/new')
  .get(secureRoute, trips.new);

router.route('/trips/:id')
  .get(trips.show)
  .put(secureRoute, trips.update)
  .delete(secureRoute, trips.delete);

router.route('/trips/:id/edit')
  .get(trips.edit);


router.route('/users/:id')
  .get(secureRoute, users.show)
  .post(users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


router.route('/trips/:id/comments')
  .post(secureRoute, trips.createComment);

router.route('/trips/:id/comments/:commentId')
  .delete(secureRoute, trips.deleteComment);

router.all('*', (req, res) => res.notFound());

module.exports = router;
