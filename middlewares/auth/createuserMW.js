/**
 *  Set a password to a username then redirrect to /
 */
const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const UserModel = requireOption(objectRepository, "UserModel");

  return function (req, res, next) {
    if (
      typeof req.body.username === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }
    console.log(res.locals);
    res.locals.user = new UserModel();

    res.locals.user.username = req.body.username;
    res.locals.user.password = req.body.password;
    console.log(res.locals);
    res.locals.user.save((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/`);
    });
  };
};
