import {Sequelize} from 'sequelize'

const db = new Sequelize('auth_db','root','klok-19-10-18',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db