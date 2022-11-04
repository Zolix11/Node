/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.session.loggedin === "undefined" ||
      req.session.loggedin !== true
    ) {
      return res.redirect("/");
    }
    //console.log(req.session.user);
    next();
  };
};
