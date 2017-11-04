const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //console.log(req.headers);
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).send('Unauthorized, please log in');
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      next(err);
    }
    //console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};
