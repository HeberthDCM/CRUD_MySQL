import express from 'express'
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import {join, dirname, extname} from 'path'
import {fileURLToPath} from 'url'

// Initializations
const app = express() // corre el servidor
const __dirname = dirname(fileURLToPath(import.meta.url)); // obtiene la ruta del proyecto
// Settings
app.set('port', process.env.PORT || 3000); // setea el puerto
app.set('views',join(__dirname,'views')); // setea la carpeta de las vistas
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// middlewares
app.use(morgan('dev')); // muestra las peticiones por consola
app.use(express.urlencoded({extended: false})); // para entender los datos que vienen de un formulario
app.use(express.json()); // para entender los datos que vienen en formato json

// Routes
app.get('/', (req, res) => {
    res.json({message: 'hola HDCM'});
});


// Public files
app.use(express.static(join(__dirname,'/public')));

// Run server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});



