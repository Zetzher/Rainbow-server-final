const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Evento = require("../models/event")

//GET
router.get('/', (req, res, next) => {
    Evento
        .find()
        .populate('asistencia')
        .then(dbResponse => {
            res.status(200)
                .json(dbResponse)

        })
        .catch(err => console.log('En metodo GET de Eventos ha ocurrido:', err))
})


//POST
router.post('/create', (req, res, next) => {
    const {
        nombre,
        descripcion,
        lugar
    } = req.body
    Evento
        .create({
            nombre,
            descripcion,
            lugar
        })
        .then((dbResponse) => {
            res.status(200)
                .json(dbResponse)
        })
        .catch(err => console.log('En metodo POST de Eventos ha ocurrido:', err));
});

//POST CURRENT USER ID
router.post("/:id", async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const asistencia = req.session.currentUser._id;
        
await Evento.findByIdAndUpdate( eventId, {$push:{ asistencia }
});   
        res.status(200)
    } catch (error) {
        console.log(error);
    }
})

//DELETE CURRENT USER ID FROM EVENT
router.post('/:id/delete', async (req, res, next) => {
        try {
            const eventId = req.params.id;
            const asistencia = req.session.currentUser._id;
            
    await Evento.findByIdAndUpdate( eventId, {$pull:{ asistencia }
    });   
            res.status(200)
        } catch (error) {
            console.log(error);
        }
    })

//EDIT EVENTO
router.put('/edit/:id', async (req, res, next) => {
    try {
        const {
            nombre,
            descripcion,
            lugar
        } = req.body;
        const id = req.params.id
        await Evento.findByIdAndUpdate({
            _id: id //condición para encontrarlo
        }, {
            nombre,
            descripcion,
            lugar
        });

        res.status(200)
            .json({
                nombre,
                descripcion,
                lugar,
            })

    } catch (error) {
        //console.log(error);
    }
});

// POST delete Evento
router.post('/:id/delete', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        console.log('El evento con este id va a ser borrado:', id);
        await Evento.findByIdAndRemove(id);
    } catch (error) {
        next(error);
    }

});

module.exports = router;