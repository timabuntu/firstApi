const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/');
  const isFilterEndpoint = splitEndpoint.filter(Boolean);

  if (isFilterEndpoint.length > 1) {
    pathname = `/${isFilterEndpoint[0]}/:id`;
    id = isFilterEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000')
);
