const getUserInfo = (req, res, next) => {
  req.id_account = req.params.id_account;
  console.log(req.id_account);
  next();
};
module.exports = getUserInfo;
