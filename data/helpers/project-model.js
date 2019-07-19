const knex = require(knex);
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
    return db('projects')
        .join('actions', 'projects.id', 'actions.project_id')
        .where({ 'projects.id': id });
}