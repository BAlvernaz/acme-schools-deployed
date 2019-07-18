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
    notNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    notNull: false
  },
  email: {
    type: Sequelize.STRING,
    notNull: false,
    validate: {
      isEmail: true
    },
    unqiue: true
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
