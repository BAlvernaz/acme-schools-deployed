const router = require("express").Router();
const { Student } = require("../../db/index");

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if(req.body.schoolId === "--Not Enrolled --" || !req.body.schoolId) {
      const newStudent = await Student.create({...req.body, schoolId: null})
      res.status(201).send(newStudent);
    }
    const newStudent = await Student.create(req.body)
    res.status(201).send(newStudent);
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if(req.body.schoolId === "--Not Enrolled --" || !req.body.schoolId) {
      const upStudent = await Student.update({schoolId: null}, {
        where: {
          id: req.params.id
        }
      });
      res.send(upStudent);
    }
    const upStudent = await Student.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.send(upStudent);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
