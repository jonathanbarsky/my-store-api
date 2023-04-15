const boom = require("@hapi/boom");

//recivimos el schema que voy a validar y el property, esto es un middleware dinamico
function validatorHandler(schema, property){//este es un middleware normal, no uno de error, por eso no lleva el parametro err
  return (req, res, next) => { // creamos un middleware de forma dinamica
    const data = req[property]//de la parametro property viene la informacion
    const { error } = schema.validate(data, { abortEarly: false });//abortEarly sirve para que nos envie todods lo errores al modificar o crear algo  y no solo el primero que encuentre, nos mostraria todods loserrores presentes y no solo uno por uno
    if(error){
      //asi se hace para que los middlewaresde tipo error lo procesen
      next(boom.badRequest(error))//esto nos envia un error de status 400
    }
    next();
  }
}

module.exports = validatorHandler;
