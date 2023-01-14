const Company = require('../models/company');
const { ADMIN, COMPANY } = require("../constants/roles")

exports.findAll= (req,res) => {
    if( req.user.role === COMPANY)
    return res.status(401).send({ message: "Access Denied" })

    Company.find({})
    .then(companies => res.status(200).send(companies))
    .catch(error => res.status(400).send({ message: "Internal Server Error!" }))
}

exports.findById = (req, res) => {
    if(req.user.role === COMPANY)
    return res.status(401).send({ message: "Access Denied" })

    Company.findById(req.params.id)
    .then(company => res.status(200).send(company))
    .catch(error => res.status(400)
    .send({ message: "Internal Server Error!" }))
}

exports.delete = (req,res) => {
    if(req.user.role !== ADMIN)
    return res.status(401).send ({ message: "Access Denied." });

    Company.deleteOne({ _id: req.params.id })
    .then(success => res.status(200)
    .send(success.deleteCount.toString()))
    .catch(error => res.status(400)
    .send({ message: "Internal Server Error!" }));
}