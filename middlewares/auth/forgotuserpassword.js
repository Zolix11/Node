/**
 *  changes users password
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

    UserModel.findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        return next(err);
      } else if (!result) {
        res.locals.error = "There is no user to change password for";
        return next(err);
      }
      result.password = req.body.password;
      result.save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(`/`);
      });
    });
  };
};
