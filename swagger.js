import swaggerAutogen from 'swagger-autogen';
import LoginModel from './models/loginModel.js';
import UsuarioModel from './models/usuarioModel.js';
import PerfilModel from './models/perfilModel.js';

const doc = {
    info: {
      title: 'PFS2 - API',
      description: 'API criada utilizando o padrão REST na disciplina de Programação Fullstack 2'
    },
    host: 'localhost:5000',
    securityDefinitions: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'chaveapi',
        description: 'Chave de acesso para a utilização da API'
      }
    },
    components: {
      schemas: {
        loginModel: new LoginModel("teste@teste.com", "123").toJSON(),
        usuarioModel: new UsuarioModel(999, "Fulano", "teste@teste.com.br", "123teste", new PerfilModel(1, 'Administrador')).toJSON(),
        perfilModel: new PerfilModel(1, 'Administrador')
      },
    }
};
  
const outputFile = './swagger-output.json';
const routes = ['./server.js'];
  
swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc).then(async () => {
    await import('./server.js');
})