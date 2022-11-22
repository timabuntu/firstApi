const http = require('http');

const user = require('./mocks/users');

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  if (request.url === '/users' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Users</h1>');
  }

  // response.writeHead(200, { 'Content-Type': 'text/html' });
  // response.end('<h1>Ola NodeJs</h1>');
});

server.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000')
);
