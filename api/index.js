const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
// const { Server } = require("http");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error,handler")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());// esto sirve para recibir informacion de un metodod post en formato json
app.use(cors())//de esta manera habilitamos a cualquier dominio o que acepte a cualquier origen


// const whiteList = ["http://locahost:8080", "http://myapp.co"]// estos son los origenes que quiero que tengan permitido hacer peticiones, o sea que estos origenes va a tener permso de hacer request, esto puede aumentar la seguridad del sitio ademas reduciendo los origenes de los posibles ataques
// const options = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin) || !origin){
//       callback(null, true);//null: no hay error y true: tiene el acceso permitido
//     } else{
//       callback(new Error("no permitir"))
//     }
//   }
// }
app.get("/api", (req, res) => {
  res.send("Hola, este es mi primer server")
})
app.get("/api/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
})

routerApi(app);

app.use(logErrors);//los middlewares de  tipo error se deben usar despues de hacer el routing, es un error comun no hacerlo de esta forma
app.use(boomErrorHandler);
app.use(errorHandler);//es muy importante saber el orden en la que se ejecutan, si pongo primero uno que no ejecuta ningun next no se ejecutarian los siguientes

app.listen(port, () => {
  console.log("Mi port " + port)
})

process.on("uncaughtException", (err, origen) => {
  console.error(err)
  console.log(origen)
})
