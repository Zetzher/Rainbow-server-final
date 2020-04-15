const express = require("express");
const router = express.Router();
const Ocio = require('../models/ocio.js');


//GET
router.get('/', (req, res, next) =>{
Ocio
.find()
.then((dbResponse)=>{
res.status(200)
.json(dbResponse)
})
})



module.exports = router;