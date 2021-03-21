import React from 'react';
import { AuthContext } from '../app/app';
import { LoginService } from './services/login-services';
import './login.scss';

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  const loginService = new LoginService();
  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    loginService.login({ login: data.email, password: data.password })
      .then(res => {
        if (res.ok) {
          const r = {};//res.json();
          return {
            ...r,
            ...{ user: 'test', token: '817928719241204003' }
          }
        } else {          
          throw res;
        }
      })
      .then(resJson => {
        dispatch({
          type: "LOGIN",
          payload: resJson
        });
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };
  return (
    <div className="login-container">
      <form className="row vertical center" onSubmit={handleFormSubmit}>
        <h1 className="col">Вход</h1>

        <label className="col row center-v" htmlFor="email">
          <span className="col-2">Логин</span>
          <input
            className="col form-control"
            type="text"
            value={data.email}
            onChange={handleInputChange}
            name="email"
            id="email"
          />
        </label>

        <label className="col row center-v" htmlFor="password">
          <span className="col-2">Пароль</span>
          <input
            className="col form-control"
            type="password"
            value={data.password}
            onChange={handleInputChange}
            name="password"
            id="password"
          />
        </label>

        {data.errorMessage && (
          <span className="form-error">{data.errorMessage}</span>
        )}

        <div className="col">
          <button className="btn btn-primary" disabled={data.isSubmitting}>
            {data.isSubmitting ? "Загрузка..." : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
