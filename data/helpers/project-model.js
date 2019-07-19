const knex = require('knex');
const db = knex(require('../../knexfile').development);


module.exports = {
    addProject,
    addAction,
    getProjectById
}

function addProject(project) {
    return db('projects').insert(project);
}

function addAction(action) {
    return db('actions').insert(action);
}

function getProjectById(id) {
    let project,actions = [];
    project = db('projects').where({ id });
    actions = db('actions')
                .join('projects', 'actions.project_id', 'projects.id')
                .select('projects.projectName', 'actions.description', 'actions.notes', 'actions.completed')
                .where( { "project_id": id });
    return actions;
}