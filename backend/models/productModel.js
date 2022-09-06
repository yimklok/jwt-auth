import Sequelize from 'sequelize'
import db from '../config/Database.js'

const Product = db.define('product',{
    product_id: {
        type:Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    checked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    sold:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    url: Sequelize.STRING
},{
    freezeTableName: true
})
export default Product;
// create table to mysql
// (async()=>{
//     await db.sync()
// })()