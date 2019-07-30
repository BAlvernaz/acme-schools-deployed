const {db, School, Student} = require('./index')
const faker = require('faker')

const studentArr = []

for(let i = 0; i < 10; i++) {
  studentArr.push(({firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), gpa: (Math.random() * 4).toFixed(2), password: faker.internet.password()}))
}


const seed = async () => {
  await db.sync({force: true})
  await Student.create({firstName: "Admin", lastName: "Admin", email:"admin@admin.com", gpa: 4, password: "password"})
  await studentArr.map(student => Student.create(student))
  await School.create({name: 'Cal Poly San Luis Obispo', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/CalPoly_Seal.svg/1024px-CalPoly_Seal.svg.png'})
  await School.create({name: 'Cal Berkeley', image:'http://3b9m3d3keq0q4enwal2laffp.wpengine.netdna-cdn.com/wp-content/uploads/2014/12/UC-Berkeley.jpg'})
}

module.exports = seed
