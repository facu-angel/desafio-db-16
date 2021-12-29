const {options} = require('./options/db.js')
const knex = require('knex')(options)
class Contenedor{
    createTableProducts( ){
        knex.schema.createTable('products', table=>{
            table.increments('id')
            table.string('title')
            table.integer('price')
        })
        .then(()=>{
            console.log('table created')
        })
        .catch((error)=>{
            console.log(error)
            throw error 
        })
        .finally(()=>{
            knex.destroy();
        })
    }
    insertTableProducts(array){
        knex('products').insert(array)
        .then(()=>{
            console.log('products inserted')
        })
        .catch((error)=>{
            console.log(error)
            throw error 
        })
        .finally(()=>{
            knex.destroy();
        })
    }
    deleteById(id){
        knex.from('products').where("id", id).del()
        .then(() => {
            console.log("product deleted")
        })
        .catch(err => {console.log(err); throw err; })
        .finally(() => {
            knex.destroy();
        })
    }
    viewAll(){
        knex.from('products').select("*")
        .then((rows) => {
            for(const row of rows) {
                console.log(`${row.id} ${row.title} ${row.price}`)
            }
            return rows
        })
        .catch(err => {console.log(err); throw err; })
        .finally(() => {
            knex.destroy();
        })
    }
    updateById(id, title, price){
        knex.from('products').where('id',id).update({title:title, price:price})
        .then(() => {
            console.log("product updated")
        })
        .catch(err => {console.log(err); throw err; })
        .finally(() => {
            knex.destroy();
        })
    }
}

module.exports= Contenedor


