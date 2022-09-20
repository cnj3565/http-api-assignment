const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success, // 200 Code
  '/badRequest': jsonHandler.badRequest, // Both 400 and 200 Code
  notFound: jsonHandler.notFound, // 404 Code
  '/unauthorized': jsonHandler.unauthorized, // Both 401 and 200 Code
  '/forbidden': jsonHandler.forbidden, // 403 Code
  '/internal': jsonHandler.serverError, // 500 Code
  '/notImplemented': jsonHandler.notImplemented, // 401 Code
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const queryParams = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, queryParams);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
