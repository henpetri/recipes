import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcEmptyTrash, FcSettings } from 'react-icons/fc';
import api from '../../services/api';

import './styles.css';

interface Recipes {
  id: number;
  nome: string;
  ingredientes: string;
  modo: string;
}

const ConsultarReceitas = () => {
  const history = useHistory();

  const [recipes, setRecipes] = useState<Recipes[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      const response = await api.get('/recipes');

      setRecipes(response.data);
    }

    loadRecipes();
  }, []);

  async function handleDelete(id: Number) {
    await api.delete(`/recipes/${id}/deletar`);
    const response = await api.get('/recipes');

    alert('Receita deletada com sucesso!');

    setRecipes(response.data);
  }

  function handleUpdate(id: Number) {
    history.push(`/atualizar-receita/${id}`);
  }

  return (
    <div className="container text-center">
      <div className="row">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button type="button" className="btn btn-vol btn-block mt-2">
            Voltar
          </button>
        </Link>
      </div>

      <h1 className="mt-2">Receitas cadastradas</h1>

      <div className="row justify-content-center mt-2 d-flex cons">
        {recipes.map(recipes => (
          <div className="col-xl-4 col-lg-6 mb-2" key={recipes.id}>
            <div className="card" style={{ height: 500 }}>
              <div className="card-header p-2">
                <div className="row c">
                  <div className="title col-9 text-left" style={{ height: 80 }}>
                    {recipes.nome}
                  </div>
                  <div className="text-right c">
                    <FcSettings
                      className="c"
                      type="button"
                      title="Editar"
                      onClick={() => handleUpdate(recipes.id)}
                    />
                    <FcEmptyTrash
                      className="c"
                      type="button"
                      title="Excluir"
                      onClick={() => handleDelete(recipes.id)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-title mt-1">Ingredientes</div>
              <p className="cont mx-1">{recipes.ingredientes}</p>
              <div className="card-title mt-1">Modo de preparo</div>
              <p className="cont mx-1">{recipes.modo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultarReceitas;
