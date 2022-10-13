/*
*   Render the views in the future
*/

module.exports = function (objectrepository, viewName) {
    return function (req, res){
        console.log('render: ' + viewName);
        res.end('Template: '+ viewName);
    };
};