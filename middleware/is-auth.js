const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ROUTES } = require('../constants/constants');
const { UNAUTHORIZED_RESPONSE } = require('../constants/response')

module.exports = (req, res, next) => {

  const operationName = req.body.operationName;
  if (UNAUTHORIZED_ROUTES.includes(operationName)) {
    req.isAuth = false;
    return next();
  }
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return res.status(401).send({ ...UNAUTHORIZED_RESPONSE })
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return res.status(401).send({ ...UNAUTHORIZED_RESPONSE })
    // return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT);
  } catch (err) {
    req.isAuth = false;
    return res.status(401).send({ ...UNAUTHORIZED_RESPONSE })
    // return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return res.status(401).send({ ...UNAUTHORIZED_RESPONSE })
    // return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.companyId = decodedToken.companyId;
  req.role = decodedToken.role;
  next();
};
