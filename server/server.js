import express from 'express'
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express'
import { handlerFunctions} from './controller.js'

const app = express()
const port = 8002

ViteExpress.config({ printViteDevServerHost: true })

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'hello', saveUninitialized: true, resave: false }));

app.get('/api/session-check', handlerFunctions.sessionCheck)
app.post('/api/login', handlerFunctions.login)
app.get('/api/logout', handlerFunctions.logout)
app.post('/api/register', handlerFunctions.register)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port.toString()}`));