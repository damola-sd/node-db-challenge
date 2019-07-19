const knex = require('knex');
const db = knex(require('../../knexfile').development);


module.exports = {
    addProject,
    addAction,
    getProjectById,
    updateProject,
    deleteProject
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

function updateProject(id, changes) {
    return db(projects).where({ id }).update(changes);
}

function deleteProject(id) {
    return db(projects).where({ id }).del();
}