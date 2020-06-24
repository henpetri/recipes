import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import ConsultarReceitas from './pages/ConsultarReceitas';
import Atualizar from './pages/Atualizar';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact={true} />
      <Route component={Cadastro} path="/cadastrar-receita" />
      <Route component={ConsultarReceitas} path="/consultar-receitas" />
      <Route component={Atualizar} path="/atualizar-receita/:id" />
    </BrowserRouter>
  );
};

export default Routes;
