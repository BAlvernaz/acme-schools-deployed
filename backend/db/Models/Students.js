const db = require('../db')
const Sequelize = require('sequelize')
const crypto = require('crypto')
const saltHash = require('../utils')

const Student = db.define('student',{
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
},
{
  hooks: {
    beforeCreate: student => {
      student.password = saltHash(student.password)
  }
},
})

module.exports = Student
