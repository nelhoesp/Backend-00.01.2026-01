const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/all', (req, res) => {
    db.Person.findAll()
        .then(persons => {
            res.status(200).send(persons)
        })
        .catch(err => {
            res.status(500).send({ msg: err })
        })
})

router.get('/:id', (req, res) => {
    db.Person.findByPk(req.params.id)
        .then(person => {
            res.status(200).send(person);
        })
        .catch(err => {
            res.status(500).send({ msg: err })
        })
})

router.post('/', (req, res) => {
    db.Person.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
        .then(person => {
            res.status(200).send(person);
        })
        .catch(err => {
            res.status(500).send({ msg: err })
        })
})
router.put('/', (req, res) => {
    db.Person.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    })
        .then(person => {
            res.status(200).send(person);
        })
        .catch(err => {
            res.status(500).send({ msg: err })
        })
})

router.delete("/:id", (req, res) => {
    db.Person.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200)
        }).catch(err => {
            res.status(500).send({ msg: err })
        })
})

module.exports = router;