const { expect } = require("chai");
const seed = require("./seed");
const { db, Student, School } = require("./index");

describe("Database Creation", () => {
  describe("Datalayer", () => {
    beforeEach(() => seed);
    describe("Student Model", () => {
      it("Should Have 1 Student", async () => {
        const students = await Student.findAll();
        expect(students.length).to.equal(1);
      });
      it("Should have a First and Last Name, Email", async () => {
        const student = await Student.findOne();
        expect(student.firstName).to.equal("Blake");
        expect(student.lastName).to.equal("Alvernaz");
        expect(student.email).to.equal("balverna@gmail.com");
      });
    });
    describe("School Model", () => {
      it("Should Have 1 School", async () => {
        const schools = await School.findAll();
        expect(schools.length).to.equal(1);
      });
      it("Should Have A Name", async () => {
        const school = await School.findOne();
        expect(school.name).to.equal('Cal Poly San Luis Obispo')
      });
    });
  });
});
