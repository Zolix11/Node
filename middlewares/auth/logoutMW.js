/**
 *  Logs out the current user from the session and redirects to log in page
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  };
};
