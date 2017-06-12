const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/trips-advisor';
const secret = process.env.SESSION_SECRET || ' shhh its a secret ';


module.exports = { port, env, dbURI, secret };
