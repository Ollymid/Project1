const Trip = require('../models/trip');

function indexTrip(req, res, next) {
  Trip
   .find()
   .populate('createdBy')
   .exec()
   .then((trips)  => res.render('trips/index', { trips }))
   .catch(next);
}

function newTrip(req, res) {
  return res.render('trips/new');
}

function createTrip(req, res, next) {

  req.body.createdBy = req.user;
  if(req.file) req.body.image = req.file.key;

  Trip
    .create(req.body)
    .then(() => res.redirect('/trips'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/trips/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      return res.render('trips/show', { trip });
    })
    .catch(next);
}

function editTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.redirect();
      if(!trip.belongsTo(req.user)) return res.unauthorized(`/trips/${trip.id}`, 'You do not have permission to edit this');
      return res.render('trips/edit', { trip });
    })
    .catch(next);
}

function updateTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      if(!trip.belongsTo(req.user)) return res.unauthorized(`/trips/${trip.id}`, 'You do not have permission to edit this');
      for(const field in req.body) {
        trip[field] = req.body[field];
      }
      return trip.save();
    })
    .then(() => res.redirect(`/trips/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/trips/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      if(!trip.belongsTo(req.user)) return res.unauthorized(`/trips/${trip.id}`, 'You do not have permission to edit this');
      return trip.remove();
    })
    .then(() => res.redirect('/trips'))
    .catch(next);
}

// comment routes

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      trip.comments.push(req.body);
      return trip.save();
    })
    .then((trip) => res.redirect(`/trips/${trip.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      const comment = trip.comments.id(req.params.commentId);
      comment.remove();

      return trip.save();
    })
    .then((trip) => res.redirect(`/trips/${trip.id}`))
    .catch(next);
}


module.exports = {
  index: indexTrip,
  new: newTrip,
  create: createTrip,
  show: showTrip,
  edit: editTrip,
  update: updateTrip,
  delete: deleteTrip,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
