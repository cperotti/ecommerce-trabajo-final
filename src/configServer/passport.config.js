import passport from 'passport'
import local from 'passport-local'
import UserManagerMongo from '../dao/mongo/user.mongo.js'
import { createHash, isValidPassword } from '../utils.js';
import GithubStrategy from 'passport-github2'
import passportJWT from 'passport-jwt';
//import dotEnv from 'dotenv';
//dotEnv.config()

const userMongo  =  new UserManagerMongo();

const LocalStrategy = local.Strategy

export const initPassport = () => { 
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {first_name, last_name, role} = req.body
        try {
            let user = await userMongo.validateUser({email: username})
            if (user) return done(null, false)

            let newUser = {
                first_name,
                last_name,
                email: username,
                role,
                password: createHash(password)
            }

            let result = await userMongo.addUser(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error al obtener el usuario'+error)
        }

    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userMongo.validateUser({_id:id})
        done(null, user)
    })


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        const user = await userMongo.validateUser({email: username})
        try {
            if(!user) return done(null, false)
    
            if(!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
            
        } catch (error) {
            return done(error)
        }
    }))
}

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

let cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['cookieUser']
    }
    return token
}

export const initializePassport = () =>{

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET_KEY
    }, async (jwt_payload, done)=>{
        try {
            done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    // passport.serializeUser()
    // passport.deserializeUser()
}


export const initPassportGitHub = () => {
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            let user = await userMongo.validateUser({email: profile._json.email})

            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    date_of_birth:'',
                    password:''
                }
                let result = await userMongo.addUser(newUser)
                return done(null, result)
            }

            return done(null,user)

        } catch (error) {
            console.log(error);
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userMongo.validateUser({_id:id})
        done(null, user)
    })

}
