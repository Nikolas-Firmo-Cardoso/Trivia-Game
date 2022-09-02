import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameHeader from '../components/GameHeader';

// useSelector pega informações do estado global
export default function Feedback() {
  const { assertions, score, name, gravatarImage } = useSelector((state) => state.player);

  function saveLocalStorage() {
    console.log('aqui');
    if (localStorage.ranking) {
      const aux = JSON.parse(localStorage.ranking); // JSON.parse() recebe uma string JSON e a transforma em um objeto JavaScript

      aux.push({ name, score, picture: gravatarImage });

      localStorage.ranking = JSON.stringify(aux); // JSON.stringify() recebe um objeto JavaScript e o transforma em uma string JSON
    } else {
      localStorage.ranking = JSON.stringify([{ name, score, picture: gravatarImage }]);
    }
  }

  const magicNumber3 = 3;
  return (
    <div>
      <GameHeader />
      <h2 data-testid="feedback-text">
        {assertions >= magicNumber3
          ? 'Well Done!' : 'Could be better...'}
      </h2>
      <section>
        <h3>
          Placar final:
          {' '}
          <span data-testid="feedback-total-score">{Number(score)}</span>
          {' '}
          pontos
        </h3>
        <h3>
          Total de perguntas corretas:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
        </h3>
      </section>
      <section />

      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ saveLocalStorage }
        >
          Ranking
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          id="button-play-again"
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </Link>

    </div>
  );
}
