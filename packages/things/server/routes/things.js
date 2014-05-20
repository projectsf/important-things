'use strict';

// The Package is past automatically as first parameter
module.exports = function(Things, app, auth, database) {

    app.get('/things/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/things/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/things/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/things/example/render', function(req, res, next) {
        Things.render('index', {
            package: 'things'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
