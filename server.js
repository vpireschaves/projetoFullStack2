import express from 'express';
import usuarioRoute from './routes/usuariosRoute.js'; 
import perfilRoute from './routes/perfilRoute.js';
import loginRoute from './routes/loginRoute.js';
import imovelRoute from './routes/imovelRoute.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const outputJson = require ('./swagger-output.json');

import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());

//página de documentação
app.use('/documentacao', swaggerUi.serve, swaggerUi.setup(outputJson));

app.use('/usuarios', usuarioRoute);
app.use('/perfil', perfilRoute);
app.use('/login', loginRoute);
app.use('/imovel',     
    // #swagger.tags = ['Imovel']    
    /* #swagger.security = [{     "bearerAuth": [] }] */
imovelRoute);

app.listen(5000, function () {
    console.log("backend em execução");
})