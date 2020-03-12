const express = require('express');
const router = express.Router();
const projectModel = require('../data/helpers/projectModel.js'); //check path
const Actions = require('../../data/helpers/actionModel.js');  // check path

const { checkProjectId, bodyValidation, } = require('./validation-middleware.js'); // validation middle-ware insertion point

router.get('/', (req, res) => {

    projectModel.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to get projects"});
    });
});

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', checkProjectId, (req, res) => {
    const {id} = req.params

    Actions.get(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ message: "Failed to get actions from database", error: err}))
})

router.post('/', bodyValidation, (req, res) => {
    console.log(req.body)

})

