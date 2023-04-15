function logErrors(err, req, res, next){//middleware de tipo error
  console.error(err);
  next(err);// es necesario enviar el error para especificar que e un middleware de tipo error
}

//aunque no estes utilizando la funcion next debes ponerla, ya que es la forma en la que se detecta que es un middleware, debe tener los 4 parametros
function errorHandler(err, req, res, next){//middleware de formato para devolverse a nuestro cliente
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

//error comun de node: Cannot set headers after they are sent to the client

function boomErrorHandler(err, req, res, next){
  if(err.isBoom){//asi sabemos si el error es de tipo boom
    const { output } = err;
    res.status(output.statusCode).json(output.payload)//aca decimos que siga al sigueinte mddleware y no queremos eso y por eso da el error de node, la forma de arreglarlo es con un else
  }// con esto evitamos ese error comun
    next(err); // si el error no es de tipo boom le decimos que ejecute un middleware de tipo error "normal"o sea los que no son de tipo boom
}



module.exports = { logErrors, errorHandler, boomErrorHandler };
