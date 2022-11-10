/**
 * Load songs from the database,
 * the result is saved to res.locals.songs
 */
const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const SongModel = requireOption(objectRepository, "SongModel");

  return function (req, res, next) {
    SongModel.find({ _ownerplaylist: req.params.playlist }, (err, songs) => {
      if (err || !songs) {
        return next(err);
      }
      res.locals.songs = songs;
      return next();
    });
  };
};
