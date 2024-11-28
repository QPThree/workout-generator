// const { auth } = require('express-openid-connect');
// const secretCode = process.env.AUTH_0_SECRET
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: secretCode,
//   baseURL: 'https://www.colinslazygenerator.com',
//   clientID: '0WGSquqnJqfTfFwqroY1uArAPIIvEXbH',
//   issuerBaseURL: 'https://dev-cslkpjrs07f1l8bo.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });