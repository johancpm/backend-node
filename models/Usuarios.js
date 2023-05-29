const {Schema, model} = require('mongoose')


const UserSchema = Schema({

  name: {
    type: String,
    required: true
  },

  Email: {
      type: String,
      required: true,
      unique: true
  },

  password:{
    type: String,
    required: true
  }

})

module.exports= model('Usuario', UserSchema)