const mid2 = (req, res, next) => {
  console.log("middleware 2");
  // console.log(req.customVar);
  next();
};

module.exports = mid2;
