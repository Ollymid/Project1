const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/trips-advisor';
mongoose.connect(dbURI);

const User = require('../models/user');
const Trip = require('../models/trip');

User.collection.drop();
Trip.collection.drop();

User
  .create([{
    firstName: 'Olly',
    lastName: 'Middleton',
    username: 'ollymid',
    email: 'olly@fake.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Trip
      .create([{
        latitude: '51.528306',
        longitude: '-0.133239',
        title: 'Dodgy escalator at Kings Cross',
        image: 'https://www.fillmurray.com/200/300',
        fallType: 'Stumble',
        description: 'Oucheeee',
        createdBy: users[0]
      }]);
  })
  .then((trips) => console.log(`${trips.length} trips created`))

  .catch((err) => console.log(err))

  .finally(() => mongoose.connection.close());
