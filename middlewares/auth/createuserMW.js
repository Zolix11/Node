/**
 *  Creates a user with a username password then redirrect to /
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

    if (req.body.username === "" && req.body.password === "") {
      res.locals.error = "There is no username and password";
      return next();
    } else if (req.body.username === "") {
      res.locals.error = "There is no username";
      return next();
    } else if (req.body.password === "") {
      res.locals.error = "There is no password";
      return next();
    } else if (req.body.password.length < 4) {
      res.locals.error = "The password is too short";
      return next();
    }

    UserModel.findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        return next(err);
      } else if (result) {
        res.locals.error = "There is a user already with this username";
        console.log("van ilyen név");
        return next();
      } else {
        res.locals.user = new UserModel();
        res.locals.user.username = req.body.username;
        res.locals.user.password = req.body.password;

        res.locals.user.save((err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(`/`);
        });
      }
    });
  };
};
