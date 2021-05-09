const jwt = require(`jsonwebtoken`);
const authModel = require(`./../models/auth`);
const response = require(`./../helpers/response`);
const allRole = async (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return response(res, "Access denied", {}, 401, false);
  try {
    const check = await authModel.isLogout(token);
    if (check.length > 0) {
      return response(res, "Token has Logout", {}, 403, false);
    }
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return response(res, "Expired Token", {}, 400, false);
    }
    response(res, "Invalid Token", {}, 400, false);
  }
};
const student = async (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return response(res, "Access denied", {}, 401, false);
  try {
    const check = await authModel.isLogout(token);
    if (check.length > 0) {
      return response(res, "Token has Logout", {}, 403, false);
    }
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    if (req.user._role === "0") {
      next();
    } else {
      return response(res, "Forbiden Access", {}, 403, false);
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return response(res, "Expired Token", {}, 400, false);
    }
    response(res, "Invalid Token", {}, 400, false);
  }
};
const facilitator = async (req, res, next) => {
  const token = req.header(`auth-token`);
  if (!token) return response(res, "Access denied", {}, 401, false);
  try {
    const check = await authModel.isLogout(token);
    if (check.length > 0) {
      return response(res, "Token has Logout", {}, 403, false);
    }
    const options = {
      issuer: process.env.ISSUER,
    };
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, options);
    req.user = verified;
    if (req.user._role === "1") {
      next();
    } else {
      return response(res, "Forbiden Access", {}, 403, false);
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return response(res, "Expired Token", {}, 400, false);
    }
    response(res, "Invalid Token", {}, 400, false);
  }
};
module.exports = {
  student,
  facilitator,
  allRole,
};
