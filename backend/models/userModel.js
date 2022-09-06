import {Sequelize} from 'sequelize'
import db from '../config/Database.js'

const { DataTypes } = Sequelize 

const Users = db.define('users',{
    role:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
})

export default Users