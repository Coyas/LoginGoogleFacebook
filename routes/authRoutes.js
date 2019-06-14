const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
    res.render('login')
})

//auth logout
router.get('/logout', (req, res) => {
    // res.send('logging out')
    req.logout();
    res.redirect('/')
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'] //separa infoemacao por virgulas ['profile', 'email']
})) 

//callback de redirecionamento do google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    // res.send('user logado foi: '+req.user.googleId)
    res.redirect('/profile/')
})

//auth with facebook

module.exports = router