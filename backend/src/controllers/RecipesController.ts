import { Request, Response } from 'express';
import knex from '../database/connection';

class RecipesController {
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const recipe = await knex('recipes').where('id', id).first();

    const { nome, ingredientes, modo } = request.body;

    if (!recipe) {
      response.json({ message: 'Recipe not found.' });
    } else {
      await knex('recipes')
        .where('id', id)
        .update({
          nome: `${nome}`,
          ingredientes: `${ingredientes}`,
          modo: `${modo}`,
        });

      response.json({ message: 'Recipe was updated.' });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const recipe = await knex('recipes').where('id', id).first();

    if (!recipe) {
      return response.status(400).json({ message: 'Recipe not found.' });
    } else {
      await knex('recipes').where('id', id).delete();

      response.json({ message: 'Recipe was deleted.' });
    }
  }

  async index(request: Request, response: Response) {
    const recipes = await knex('recipes');

    return response.json(recipes);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const recipe = await knex('recipes').where('id', id).first();

    if (!recipe) {
      return response.status(400).json({ message: 'Recipe not found.' });
    }

    return response.json(recipe);
  }

  async create(request: Request, response: Response) {
    const { nome, ingredientes, modo } = request.body;

    const recipe = {
      nome,
      ingredientes,
      modo,
    };

    await knex('recipes').insert(recipe);

    return response.json({
      ...recipe,
    });
  }
}

export default RecipesController;
