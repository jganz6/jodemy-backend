const mid1 = (req, res, next) => {
  req.customVar = "pong";
  console.log("middleware 1");
  next();
};

module.exports = mid1;
