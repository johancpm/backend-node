const {response} = require('express')
const Evento = require('../models/Eventos')

const getNotas = async (req, res = response) =>{

   const eventos = await Evento.find().populate('user', 'name');

    return res.json({
        ok: true,
        msg: eventos
    })

}

const CrearNuevaNota = async(req, res = response) =>{
    
    const evento = new Evento(req.body)
    try {
       evento.user = req.uid;

      const eventoGuardado = await evento.save();
      res.status(201).json({
        ok: true,
        evento: eventoGuardado
      })
      

    } catch (error) {
       console.log(error)
       
       res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
       })
    }

   
}

const ActualizarNotas = async (req, res = response) =>{

 const notasId = req.params.id;
 const uid = req.uid;

 try {
     const evento = await Evento.findById(notasId)
     if(!evento){
      return res.status(404).json({
         ok: false,
         msg: 'El evento que esta intentando actualizar no existe'
       })
     }

     if(evento.user.toString() !== uid){
         return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para editar este evento'

         })
     }

     const nuevoEvento = {
        ...req.body,
        user: uid
     }

     const actualizarEvento = await Evento.findByIdAndUpdate(notasId, nuevoEvento, {new: true});

     res.status(201).json({
        ok: true,
        eventos: actualizarEvento
     })

 } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'habler con el administrador'
    })
 }


   
}

const EliminarNota = async(req, res = response) =>{

    const eliminarId = req.params.id;
    const uid = req.uid;

    try {
      const evento = await Evento.findById(eliminarId)

      if(!evento){
        return res.status(404).json({
           ok: false,
           msg: 'El evento que esta intentando eliminar no existe'
         })
       }

       if(evento.user.toString() !== uid){
         return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para eliminar este evento'

         })
     }

      await Evento.findByIdAndDelete(eliminarId);

      res.json({
         ok: true,
         msg: 'Evento eliminado con exito'
      })

      
    } catch (error) {
       console.log(error)
       res.status(500).json({
         ok: false,
         msg: 'hable con el administrador'

       })
    }

    
 }



module.exports= {
    getNotas,
    CrearNuevaNota,
    ActualizarNotas,
    EliminarNota
}