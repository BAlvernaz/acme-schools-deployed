const db = require('./db')
const Student = require('./Models/Students')
const School = require('./Models/Schools')


Student.belongsTo(School)
School.hasMany(Student)

module.exports = {
  db,
  Student,
  School
}
