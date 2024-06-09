const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

const SECRET_KEY = 'your_secret_key';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  // This should be replaced with your own user authentication logic
  return email === 'test@example.com' && password === '123456';
}

// Login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

// Middleware to verify the token
server.use(/^(?!\/login).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Error: access_token is not valid';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Token is invalid';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
