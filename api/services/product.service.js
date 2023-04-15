const faker = require("faker");
const boom = require("@hapi/boom");

class ProductService{
  constructor(){
    this.products = [];
    this.generate();
  }
  async generate(){//con async se hace asincrono, por el momento solo lo estamos preparando para cuando se cocecte con servicios que si sean asincronos
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()// con esto bloqueamos los datos del producto aleatoriamente, el producto especifico se mostrara con un conflicto
      });
    }
  }
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),//esto nos genera un id random
      ...data
    }
    this.products.push(newProduct);
    return newProduct// los end points de tipo create retornana el producto creado normalmente
  };
  async find(){//des esta forma trabajamos con el asincronismo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }
  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound("Product not found")
    }
    if(product.isBlock){
      throw boom.conflict("Product is block")//conflick es de status 409
    }
    return product;
  }
  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){//si no hay un index nos daria un menos uno, o sea que si no hay un array o esta vacio nos ejecuta el codigo
      // throw new Error("product not found")// esto en el caso de que no lo encuentre
      throw boom.notFound("Product not found")//boom ya sabe que not found es un 404 y asi capturamos el error con boom
    }
    const product = this.products[index];//de esta forma agarramos el producto para traerlo completo
    this.products[index] = {// este objeto representa que solo nos cambieel parametro  que le enviamos y nos evita que reemplacemos el producto solo por ese parametro enviado
      ...product,//persistimos todos los datos del producto
      ...changes// y aplicamos solo los cambios
    };
    return this.products[index];
  }
  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      // throw new Error("product not found")
      throw boom.notFound("Product not found")
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
