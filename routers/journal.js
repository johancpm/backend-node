/*
   Journal Routers

   RUTA: /apis/journal

*/


const {Router} = require('express') 
const {check} = require('express-validator')
const {getNotas, CrearNuevaNota, ActualizarNotas, EliminarNota} = require('../controllers/journal')
const {validarJwt} = require('../middlewares/validar-jwt')
const {validarCampos} = require('../middlewares/Validar-campos')
const {ValidarDate} = require('../helpers/isDate')


const router = Router();

router.use(validarJwt)

router.get('/', getNotas )

router.post('/Newnote',
[
  check('title', 'El titulo es requerido').not().isEmpty(),
  check('start', 'La hora inicial es requerida').custom(ValidarDate),
  check('end', 'La hora final es requerida').custom(ValidarDate),
  validarCampos
], 
CrearNuevaNota
 )

router.put('/:id', 
[
  check('title', 'El titulo es requerido').not().isEmpty(),
  check('start', 'La hora inicial es requerida').custom(ValidarDate),
  check('end', 'La hora final es requerida').custom(ValidarDate),
  validarCampos
]
,ActualizarNotas)

router.delete('/:id', EliminarNota)

module.exports= router;