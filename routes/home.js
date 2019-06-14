const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {User: req.user})
})

module.exports = router