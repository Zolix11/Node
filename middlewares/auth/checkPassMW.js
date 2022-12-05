/**
 *  Checks the user's password from POST if it corresponds to the filled username, if it is reddirect to /myplaylists
 */
const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
  const UserModel = requireOption(objectRepository, "UserModel");

  return function (req, res, next) {
    if (
      typeof req.body.password === "undefined" ||
      typeof req.body.username === "undefined"
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
    }

    UserModel.findOne({ username: req.body.username }, (err, result) => {
      if (err || !result) {
        return next(err);
      }
      if (result.password !== req.body.password) {
        res.locals.error = "Wrong password";
        return next();
      }
      req.session.userid = result._id;
      req.session.loggedin = true;
      return res.redirect(`/myplaylist`);
    });
  };
};
