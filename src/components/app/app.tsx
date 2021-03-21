import React from 'react';
import { Login } from '../login/login';
import { Home } from '../home/home';
import './app.scss';
import LogoImage from '../../logo.svg';
import {
  Route,
  Switch
} from "react-router-dom";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const AuthContext = React.createContext<any>({});
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const logout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }
  const logoutRedirect = () => {
    logout();
    window.location.href = '/login';
  }
  React.useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null;

    if(user && token){
      if (window.location.pathname.includes('login')) {
        logout();
      } else {
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            token
          }
        })
      }
    } else {
      if (!window.location.href.includes('login'))
        window.location.href = '/login';
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <header className="app-header">
        <div className="row">
          <div className="col-auto">
            <img width="50" height="50" src={LogoImage} alt="" />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-auto text-color__white">
            <h1>УМ-40</h1>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="col-auto text-color__light-blue">
            <h1>SMART</h1>
          </div>
          <div className="col-auto margin-left-auto">
            {state.isAuthenticated ? (
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  logoutRedirect()
                }
              >
                {state.isAuthenticated && (
                  // <h1>Hi {state.user.firstName} (LOGOUT)</h1>
                  <>Выход</>
                )}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
      <div className="App">{!state.isAuthenticated ? <></> : <Home />}</div>
      <Switch>
        <Route
          key={"login"}
          history={history}
          path={"/login"}
          component={Login}
        />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
