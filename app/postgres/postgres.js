import Sequelize from 'sequelize'

// Option 1: Passing parameters separately
export const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
  host: process.env.DBHOSTNAME,
  dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})

authtest()

async function authtest() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
