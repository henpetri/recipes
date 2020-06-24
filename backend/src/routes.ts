import express from 'express';

import RecipesController from './controllers/RecipesController';

const routes = express.Router();
const recipesController = new RecipesController();

routes.post('/recipes', recipesController.create);
routes.get('/recipes', recipesController.index);
routes.get('/recipes/:id', recipesController.show);
routes.put('/recipes/:id/atualizar', recipesController.update);
routes.delete('/recipes/:id/deletar', recipesController.delete);

export default routes;
