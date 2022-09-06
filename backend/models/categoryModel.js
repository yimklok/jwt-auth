import Sequelize from 'sequelize'
import db from '../config/Database.js'

const Category = db.define('category',{
    name:{
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
})

export default Category;
// create table to mysql
// (async()=>{
//     await db.sync()
// })()