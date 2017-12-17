const http = require('https'),
  express = require('express'),
  { join } = require('path'),
  { readFileSync } = require('fs');

const app = express();

app.use(express.static(join(__dirname, '..', 'examples')));

const server = http.createServer({
  key: readFileSync(join(__dirname, './key.pem')),
  cert: readFileSync(join(__dirname, './cert.pem'))
}, app);

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Listening on %j", server.address());
});
