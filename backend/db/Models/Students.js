const db = require('../db')
const Sequelize = require('sequelize')

const Student = db.define('students',{
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unqiue: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 4
    }
  }
})

module.exports = Student
