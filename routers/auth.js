/* 
 Rutas de usuarios / Auth

 host = /apis/auth


*/


const {Router} = require('express')

const {Crearusuario, Loginusuario, RenovarToken} = require('../controllers/auth')

const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/Validar-campos')
const {validarJwt} = require('../middlewares/validar-jwt')
const router = Router();



router.post('/New',
/*mis middlewares */
[
 check('name', 'El nombre es reuqeridoo').not().isEmpty(),
 check('Email', 'El Correo es reuqerido').isEmail(),
 check('password', 'la contraseña debe tener  6 o mas  caracteres').isLength({min: 6}),
validarCampos

],
 Crearusuario 
 );

router.post('/',
/* mis middlewares */
 [
    check('Email', 'El Correo es reuqerido').isEmail(),
    check('password', 'la contraseña debe tener  6 o mas  caracteres').isLength({min: 6}),
    validarCampos
 ],
 Loginusuario );

router.get('/Newtoken',validarJwt ,RenovarToken);

module.exports = router;