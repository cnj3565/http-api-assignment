const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// ---------------------------------------------------------------

// Page Successfully Loaded
const success = (request, response, type) => {
  const responseMsg = {
    message: 'This is a successful response',
  };

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, respond, 200, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, 200, responseJSON, 'application/json');
};

// Bad Request Made (Valid True/Missing)
const badRequest = (request, response, params, type) => {
  const responseMsg = {
    message: 'This request has the required parameters',
  };
  let status = 200;

  if (!params.valid || params.valid !== 'true') {
    responseMsg.message = 'Missing valid query param, set valid to true';
    responseMsg.id = 'badRequestValidParam';
    status = 400;
  }

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, respond, status, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, status, responseJSON, 'application/json');
};

// Page Missing (404)
const notFound = (request, response, type) => {
  const responseMsg = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return respond(request, response, 404, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, 404, responseJSON, 'application/json');
};

// Unauthorized Access (Loggin In/Logged Out)
const unauthorized = (request, response, type, params) => {
  const responseMsg = {
    message: 'This request has the required parameters',
  };
  let status = 200;

  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseMsg.message = 'You are not logged in, access is unauthorized';
    responseMsg.id = 'unauthorizedAccessLoggedInParam';
    status = 401;
  }

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, response, status, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, status, responseJSON, 'application/json');
};

// Forbidden By Server
const forbidden = (request, response, type) => {
  const responseMsg = {
    message: 'You don\'t have access to view this page on your server.',
    id: 'forbidden',
  };

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, response, 403, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, 403, responseJSON, 'application/json');
};

// Internal Server Error
const serverError = (request, response, type) => {
  const responseMsg = {
    message: 'An Internal Server Error occured. Sorry about that.',
    id: 'internalServerError',
  };

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, response, 500, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, 500, responseJSON, 'application/json');
};

// Not Yet Implemented
const notImplemented = (request, response, type) => {
  const responseMsg = {
    message: 'This has\'t been implemented yet. Check back later.',
    id: 'notImplemented',
  };

  if (type[0] === 'text/html') {
    const xmlString = `<response>${responseMsg.message}</response>`;

    return response(request, response, 500, xmlString, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseMsg);
  return respond(request, response, 500, responseJSON, 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  serverError,
  notImplemented,
};
