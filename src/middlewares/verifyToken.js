const jwt = require(`jsonwebtoken`);

const student = (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return res.status(401).send(`Access Denied`);
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    if (req.user._role === 0) {
      next();
    } else {
      return res.status(403).send(`Forbiden Access`);
    }
  } catch (err) {
    res.status(400).send(`Invalid Token`);
  }
};
const facilitator = (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return res.status(401).send(`Access Denied`);
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    if (req.user._role === 1) {
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
};
