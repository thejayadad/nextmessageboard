
const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Vent = require('../models/Vent')


router.get("/", ensureGuest, (req, res) => {
    res.render("login")
})

router.get('/board', ensureAuth, async (req, res) => {
    try {
      const vents = await Vent.find({ user: req.user.id }).lean()
      res.render('home', {
        name: req.user.firstName,
        vents,
      })
    } catch (err) {
      console.error(err)
      res.send('error/500')
    }
  })
module.exports = router