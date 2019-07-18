const router = require('express').Router()
const { School } = require('../../db/index')

router.get('/', async (req, res, next) =>{
  try {
    const schools = await School.findAll()
    res.send(schools)
    } catch(ex) {
      next(ex)
    }
})

module.exports = router
