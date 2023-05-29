const {Schema, model} = require('mongoose')


const EventSchema = Schema({

  title:{
    type: String,
    required: true
  },

  note: {
    type: String
  },
  
  start: {
    type: String,
    required: true

  },
  end: {
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
})

EventSchema.method('toJSON', function(){

const {__v, _id, ...object} = this.toObject();
 object.id = _id;
  return object;

})

module.exports= model('Evento', EventSchema)