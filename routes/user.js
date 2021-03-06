const router = require('express').Router()

const authCheck = (req, res, next) => {
    if(!req.user){
        //se user nao esta logado
        res.redirect('/auth/login')
    }else{
        // se esta logado
        next() //continue
    }
}

router.get('/', authCheck, (req, res) => {
    // res.send('estas logado, teu profile: '+ req.user.username)
    res.render('user', {User: req.user})
})




module.exports = router