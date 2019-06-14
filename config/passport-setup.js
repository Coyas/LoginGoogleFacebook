const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const AuthJson = require('../config/auth.json')
const User = require('../models/User')

// console.log(AuthJson.google.auth_uri)

passport.serializeUser((user,done) => {
    console.log('user id: '+user.id)
    done(null, user.id)
})

passport.deserializeUser((id, done, next) => {
    console.log('user id em serialize: '+id)
    User.findByPk(id).then( (err, user) => {
        done(err, user);
    })
    // .catch(() => {
    //     console.log('user nao encontrado no cookie')
    // })
})


// passport.use(
//     new GoogleStrategy({
//         // opcao para google strategy
//         callbackURL: '/auth/google/redirect',
//         clientID: AuthJson.google.client_id,
//         clientSecret: AuthJson.google.client_secret
//     }, (accessToken, refreshToken, profile, done) => {
//         // passport callback (redirect do google)
//         // console.log(profile)

//         //ver se o utilizador ja existe no banco de dados
        
        // User.findOne({
        //     where: {
        //         googleId: profile.id
        //     }
        // }).then(atualUser => {
        //     if(atualUser){
        //         //usuario ja existe
        //         console.log('user is: '+ atualUser)
        //         done(null, atualUser)
        //     }else {
        //         //usuario nao existe, entao crie-o
        //         //create user into a database
        //         User.create({
        //             username: profile.displayName,
        //             googleId: profile.id
        //         }).then( newUser => {
        //             console.log('Novo User: '+ newUser)
        //             done(null, user)
        //         })
        //     }
        // })
//     })
// )
 
console.log('clientID: '+AuthJson.facebook.clientID)
console.log('clientsecret: '+AuthJson.facebook.clientSecret)
console.log('calbackURL: '+AuthJson.facebook.callbackURL)
passport.use(new FacebookStrategy({
    clientID: AuthJson.facebook.clientID,
    clientSecret: AuthJson.facebook.clientSecret,
    callbackURL: AuthJson.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        // return cb(err, user);
        // });

        User.findOne({
            where: {
                facebookId: profile.id
            }
        }).then(atualUser => {
            if(atualUser){
                //usuario ja existe
                console.log('user is: '+ atualUser.username)
                done(null, atualUser)
            }else {
                //usuario nao existe, entao crie-o
                //create user into a database
                User.create({
                    username: profile.displayName,
                    facebookId: profile.id
                }).then( newUser => {
                    console.log('Novo User: '+ newUser)
                    done(null, user)
                })
            }
        })
    }
));