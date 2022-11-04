/**
 * Load all playlits for a user from the database
 * The result is saved to res.locals.playlists
 */
const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const PlaylistModel = requireOption(objectRepository, "PlaylistModel");

  return function (req, res, next) {
    PlaylistModel.find({ _owneruser: req.session.userid }, (err, playlists) => {
      if (err) {
        return next(err);
      }

      res.locals.playlists = playlists;
      return next();
    });
  };
};
