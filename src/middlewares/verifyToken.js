const jwt = require(`jsonwebtoken`);
const allRole = (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return res.status(401).send(`Access Denied`);
  try {
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send(`Invalid Token`);
  }
};
const student = (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return res.status(401).send(`Access Denied`);
  try {
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    if (req.user._role === "0") {
      next();
    } else {
      return res.status(403).send(`Forbiden Access`);
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).send("Expired Token");
    }
    res.status(400).send("Invalid Token");
  }
};
const facilitator = (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return res.status(401).send(`Access Denied`);
  try {
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    if (req.user._role === "1") {
      next();
    } else {
      return res.status(403).send(`Forbiden Access`);
    }
  } catch (err) {
    res.status(400).send(`Invalid Token`);
  }
};
module.exports = {
  student,
  facilitator,
  allRole,
};
