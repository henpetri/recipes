import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

interface Recipe {
  nome: string;
  ingredientes: string;
  modo: string;
}

const Atualizar = () => {
  const history = useHistory();

  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe>({
    nome: '',
    ingredientes: '',
    modo: '',
  });

  useEffect(() => {
    loadRecipe();
  }, []);

  function updateRecipe(e: ChangeEvent<HTMLInputElement>) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  async function loadRecipe() {
    const response = await api.get(`/recipes/${id}`);
    setRecipe({
      nome: response.data.nome,
      ingredientes: response.data.ingredientes,
      modo: response.data.modo,
    });
  }

  async function handleUpdate(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    await api.put(`/recipes/${id}/atualizar`, recipe);

    alert('Receita atualizada com sucesso!');

    history.push('/consultar-receitas');
  }

  return (
    <div id="content">
      <div className="container mt-5">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Nome da receita</label>
            <input
              type="text"
              className="form-control inp"
              name="nome"
              value={recipe.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateRecipe(e)}
              maxLength={30}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredientes</label>
            <input
              value={recipe.ingredientes}
              type="text"
              className="form-control inp"
              name="ingredientes"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateRecipe(e)}
              maxLength={180}
              required
            />
          </div>

          <div className="form-group">
            <label>Modo de preparo</label>
            <input
              value={recipe.modo}
              type="text"
              className="form-control inp"
              name="modo"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateRecipe(e)}
              maxLength={180}
              required
            />
          </div>

          <div className="row">
            <div className="col-6">
              <Link to="/consultar-receitas" style={{ textDecoration: 'none' }}>
                <button type="button" className="btn btn-cad btn-block">
                  Voltar
                </button>
              </Link>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-cad btn-block">
                Atualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Atualizar;
