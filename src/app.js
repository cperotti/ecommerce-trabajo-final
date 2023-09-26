import express from 'express';
import {configServer} from './configServer/configServer.js';
import { initializePassport, initPassportGitHub } from './configServer/passport.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { logger } from './utils/logger.js';
import routerServer from './routes/index.js';
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import pkg from 'connect-mongo';
import passport from 'passport';
import dotEnv from 'dotenv';
import swaggerUiExpress from 'swagger-ui-express';
import cors from 'cors'
import { specs } from './utils/swagger.js';

dotEnv.config()

const {create} = pkg;

const app = express();

configServer.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`))

app.use(cookieParser('P@l@braS3cr3t0'))

app.use(cors())

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(logger)

app.use(session({
    store: create({
        mongoUrl: process.env.MONGO_URL_SERVER,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl:1000000*6000,
    }),
    secret: 'secretCoder',
    resave:false,
    saveUninitialized: false
}))

initializePassport()
initPassportGitHub()
passport.use(passport.initialize())
passport.use(passport.session())


app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(routerServer)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> console.log('servidor arriba'));