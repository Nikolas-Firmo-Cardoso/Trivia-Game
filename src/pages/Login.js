import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actionGravatarImage, actionPlayer, getToken } from '../Redux/actions';

export default function Login(props) {
  const [name, setName] = useState('');
  // Função useState:
  // name é um estado que foi criado com essa função
  // setName é uma função criada que pode atualizar o valor desse estado
  // O '' dentro de useState('') é o valor inicial da chave name

  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();

  // Função useEffect:
  // Ela simula os ciclos de vida dos componentes (didMount, didUpdate)
  useEffect(() => {
    if (name.length > 0 && email.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [name, email]);

  async function handleBtnPlay() {
    dispatch(getToken());
    // Envia uma action para a API que gera o token de jogador

    dispatch(actionPlayer({ name, email }));
    // Envia uma action para colocar o nome e email do jogador no estado global

    dispatch(actionGravatarImage(email));
    const { history: { push } } = props;
    push('/game');
    // Envia uma action carregando o email para gerar uma imagem do gravatar e empurrar para a tela de /game
  }

  // Desestruturação do history e click do botão empurra para pagina de settings
  function handleBtnSettings() {
    const { history: { push } } = props;
    push('/settings');
  }

  return (
    <div>
      <label htmlFor="login-name">
        <input
          data-testid="input-player-name"
          id="login-name"
          name="name"
          value={ name }
          onChange={ ({ target }) => { setName(target.value); } }
        />
      </label>

      <label htmlFor="login-email">
        <input
          data-testid="input-gravatar-email"
          id="login-email"
          name="email"
          value={ email }
          onChange={ ({ target }) => { setEmail(target.value); } }
        />
      </label>

      <button
        data-testid="btn-play"
        disabled={ isDisable }
        type="button"
        onClick={ handleBtnPlay }
      >
        Play
      </button>

      <button
        data-testid="btn-settings"
        type="button"
        onClick={ handleBtnSettings }
      >
        Settings
      </button>
    </div>);
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
