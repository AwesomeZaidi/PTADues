const Faculty = require('../models/faculty');
const Groups = require('../models/groups');

module.exports = function(app) {

    app.post('/faculty/create', (req, res) => {
        Faculty.create(req.body)
        .then(() => {
            const successMessage = `Successfully%20Added%20${req.body.Name}`;
            res.redirect(`/admin/faculty/edit?successMsg=${successMessage}`);
        }).catch(error => {
            res.redirect(`/admin/faculty/edit/?errorMsg=${error.message}`);
        });
    });

    app.post('/faculty/:memberId/update', (req, res) => {
        delete req.body.Type;
        Faculty.update(req.params.memberId, req.body).then(() => {
            res.redirect('/admin/faculty/edit?successMsg=Update%20Successful.');
        }).catch(error => {
            res.redirect(`/admin/faculty/edit?errorMsg=${error}`);
        });
    });

    app.get('/faculty/:memberId/edit', (req, res) => {
        Faculty.getUpdatableCredentials(req.params.memberId).then(credentials => {
            res.render('editTeachers', { 
                layout: 'admin', edit: true,
                memberId: req.params.memberId,
                isBeingUpdated: true, 
                ...credentials 
            });
        }).catch(error => {
            res.render('editTeachers', { layout: 'admin', errorMsg: error });
        });
    });

    app.post('/admin/faculty/reorder', (req, res) => {
        const newOrder = req.body.groupOrder;
        const path = req.body.groupPath;
        Groups.reorderAtPath(path, newOrder)
        .then(() => res.end)
        .catch(res.error)
    });

    app.get('/admin/groups/assistants', (req, res) => {
        Groups.getAssistants().then(assistants => {
            res.json(assistants);
        });
    });

}