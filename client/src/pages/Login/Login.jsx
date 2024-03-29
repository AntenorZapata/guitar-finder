import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import symbol from '../../imgs/symbol.png';
import LoginForm from '../../components/LoginForm/LoginForm';

import { loginAction, clearErrors } from '../../actions';
import useValidation from '../../hooks/useValidation';
import Header from '../../components/header/Header';
import './Login.css';

export default function Login({ error, setError, initial }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({ email: '', password: '' });
  const { handleEmailValidation, handlePasswordValidation } = useValidation();

  const [authError, setAuthError] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setError(initial);
    if (token) {
      history.push('/');
    }
  }, []);

  const handleValueInput = (e) => {
    setAuthError(false);
    const { name } = e.target;
    setState({ ...state, [name]: e.target.value });
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginAction(state));
    if (res) {
      setAuthError(true);
    } else {
      history.push('/');
    }
  };

  return (
    <div>
      <Header />
      <LoginForm>
        <form onSubmit={hendleSubmit}>
          <div className="input-box">
            {/* <span htmlFor="email">Email</span> */}
            <input
              type="email"
              onBlur={(e) => handleEmailValidation(e, error, setError)}
              value={state.email}
              name="email"
              className={!error.email.valid ? 'email-invalid' : 'email-valid'}
              onChange={handleValueInput}
              placeholder="Email"
            />
            <p className={!error.email.valid ? 'input__error' : 'input__error__hidden'}>
              {error.email.text ? error.email.text : 'error msg'}
            </p>
            {/* {!error.email.valid && <p className="input__error">{error.email.text}</p>} */}
          </div>
          <div className="input-box">
            {/* <span htmlFor="password">Senha</span> */}
            <input
              onBlur={(e) => handlePasswordValidation(e, error, setError)}
              type="password"
              name="password"
              value={state.password}
              className={!error.password.valid ? 'pass-invalid' : 'pass-valid'}
              onChange={handleValueInput}
              placeholder="Senha"
            />
            <p className={!error.password.valid ? 'input__error' : 'input__error__hidden'}>
              {error.password.text ? error.password.text : 'error msg'}
            </p>
            <div className="forgot__password">
              <Link to="/forgotPassword" className="forgot__link">Esqueci minha senha</Link>
            </div>
          </div>
          <div className="login__btn">
            <button
              disabled={!error.email.valid || state.password.length < 8}
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="signup">
            <Link to="/signup" className="signup__link">Criar conta</Link>
          </div>
        </form>
        <p className={authError ? 'input__error' : 'input__error__hidden'}>
          <span>Email ou senha inválidos.</span>
        </p>
        {/* {authError && <span>Email ou senha inválidos.</span>} */}
      </LoginForm>
      {/* </div>
        </div>
      </section> */}
    </div>
  );
}
