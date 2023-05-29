const moment = require('moment')

const ValidarDate = (value) =>{

   if(!value){
       return false;
   }

  const validar = moment(value) 

  if(validar.isValid()){
      return true
  }else{
    return false
  }

}

module.exports= {ValidarDate}