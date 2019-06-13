const express = require('express')
const exphandle = require('express-handlebars')
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const keys = require('./config/auth.json')
const passport = require('passport')
/****  importando rotas */
const home = require('./routes/home')
const authRoutes = require('./routes/authRoutes')
const user = require('./routes/user');


// init express
const app = express()




/*** ativar template engine */
app.engine('handlebars', exphandle({defaultLayout: 'main'}))
app.set('view engine' ,'handlebars') 

// console.log('cookie key:'+keys.logar.secreta)
// console.log('face teste key:'+keys.facebook.teste)
// console.log('mysql db key:'+keys.mysql.cookieKey)
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 dia
    keys: [keys.logar.secreta]
}))

// iniciar o passport
app.use(passport.initialize())
app.use(passport.session())

/****** rotas */
app.use('/', home)
app.use('/auth', authRoutes)
app.use('/profile', user)

// console.log(`process port: ${process.env.PORT}`)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app em http://localhost:${port}`)
})