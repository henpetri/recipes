import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';

import './styles.css';

const Home = () => {
  const anima = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: anima.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./cook.json'),
    });
  }, []);

  return (
    <div id="content">
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <Link to="/cadastrar-receita" style={{ textDecoration: 'none' }}>
              <button className="btn-lg btn btn-block">Cadastar receita</button>
            </Link>
          </div>
          <div className="col-lg-6 mt-1 mt-lg-0">
            <Link to="/consultar-receitas" style={{ textDecoration: 'none' }}>
              <button className="btn-lg btn btn-block">
                Consultar receitas
              </button>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center mt-5 m-1">
          <h1>Cadastre e consulte receitas.</h1>
          <div className="anima" ref={anima}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
