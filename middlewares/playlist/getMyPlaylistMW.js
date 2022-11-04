/**
 * Load a playlist from the database by the :playlisid param
 * The result is saved to res.locals.playlist
 */
const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const PlaylistModel = requireOption(objectRepository, "PlaylistModel");

  return function (req, res, next) {
    PlaylistModel.findOne(
      { _id: req.params.playlist, _owneruser: req.session.userid },
      (err, playlist) => {
        if (err || !playlist) {
          return next(err);
        }
        res.locals.playlist = playlist;
        return next();
      }
    );
  };
};
