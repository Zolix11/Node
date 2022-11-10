/*
 *   Render the views in the future
 */

module.exports = function (objectrepository, viewName) {
  return function (req, res) {
    res.render(viewName);
  };
};
