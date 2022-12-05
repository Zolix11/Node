/**
 * Load a song from the database by using the :songid param
 * the result is saved to res.locals.song
 */
const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const SongModel = requireOption(objectRepository, "SongModel");

  return function (req, res, next) {
    SongModel.findOne({ _id: req.params.songid }, (err, song) => {
      if (err || !song) {
        return next(err);
      }
      res.locals.song = song;
      return next();
    });
  };
};
