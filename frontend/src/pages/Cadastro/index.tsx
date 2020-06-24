import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    ingredientes: '',
    modo: '',
  });

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { nome, ingredientes, modo } = formData;

    const data = {
      nome,
      ingredientes,
      modo,
    };

    await api.post('recipes', data);

    alert('Receita cadastrada com sucesso!');

    history.push('/');
  }

  return (
    <div id="content">
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da receita</label>
            <input
              type="text"
              className="form-control inp"
              name="nome"
              id="nome"
              onChange={handleInputChange}
              maxLength={30}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredientes</label>
            <input
              type="text"
              className="form-control inp"
              name="ingredientes"
              id="ingredientes"
              onChange={handleInputChange}
              maxLength={180}
              required
            />
          </div>

          <div className="form-group">
            <label>Modo de preparo</label>
            <input
              type="text"
              className="form-control inp"
              name="modo"
              id="modo"
              onChange={handleInputChange}
              maxLength={180}
              required
            />
          </div>

          <div className="row">
            <div className="col-6">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button type="button" className="btn btn-cad btn-block">
                  Voltar
                </button>
              </Link>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-cad btn-block">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
