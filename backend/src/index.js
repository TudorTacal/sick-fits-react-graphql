require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to ahndle cookies (JWT)
// TODO Use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is not running on port http://localhosT:${deets.port}`)
});