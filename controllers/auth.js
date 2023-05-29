const {response} = require('express')
const Usuario = require('../models/Usuarios')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt')

const Crearusuario = async(req, res = response ) =>{
   const { Email, password} = req.body
   try {

      let usuario = await Usuario.findOne({Email})

      if (usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya existe por favor ingrese otro correo'
         })
      }

      usuario = new Usuario(req.body)

      /*Encriptar contraseña */

      const salt = bcrypt.genSaltSync();

      usuario.password = bcrypt.hashSync(password, salt);
    
      await usuario.save();

      /* Guardar token */
      const token = await generarJwt(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
            
        })
    
   } catch (error) {

      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'por favor hable con el administrador'
      })
   }
}

const Loginusuario = async(req, res = response ) =>{


const {Email, password} = req.body

try {
    const usuario = await Usuario.findOne({Email})

      if (!usuario){
        return res.status(400).json({
            ok: false,
            msg: 'no existe un usuario con ese Email'
         })
      }
      /*Confirmar los password */

      const validarPassword = bcrypt.compareSync(password, usuario.password)

      if(!validarPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta'
        })
      }

      /* Generar nuestro  JWT */

      const token = await generarJwt(usuario.id, usuario.name);

      res.json({
          ok: true,
          uid: usuario.id,
          name: usuario.name,
          token
          
      })

} catch (error) {
    console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'por favor hable con el administrador'
      })
}



}

const RenovarToken = async(req, res = response ) =>{

     const {uid, name} = req
     const token = await generarJwt(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    Crearusuario,
    Loginusuario,
    RenovarToken
}