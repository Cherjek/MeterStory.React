import React from 'react';
import { Login } from '../login/login';
import { Home } from '../home/home';
import './app.scss';
// import LogoImage from '../../logo.svg';
import {
  Route,
  Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {DeviceRestartService} from "../uspd-settings/device/device-restart/services/device-restart-service";
const history = createBrowserHistory();
const version = 'v6.0.3';
export const AuthContext = React.createContext<any>({});
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
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
  const deviceRestartService = new DeviceRestartService();
  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  }
  const logoutRedirect = () => {
    logout();
    window.location.href = '/login';
  }
  window.document.title = `УСПД SMART ${version}`;
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
            <img width="75" height="75" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iOTAwLjAwMDAwMHB0IiBoZWlnaHQ9IjUyMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDkwMC4wMDAwMDAgNTIwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTIwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQ1NDMgMzUxMyBjOSAtMiAyNSAtMiAzNSAwIDkgMyAxIDUgLTE4IDUgLTE5IDAgLTI3IC0yIC0xNyAtNXoiLz4KPHBhdGggZD0iTTQzNDMgMzUwMyBjOSAtMiAyMyAtMiAzMCAwIDYgMyAtMSA1IC0xOCA1IC0xNiAwIC0yMiAtMiAtMTIgLTV6Ii8+CjxwYXRoIGQ9Ik00NzUzIDM1MDMgYzkgLTIgMjUgLTIgMzUgMCA5IDMgMSA1IC0xOCA1IC0xOSAwIC0yNyAtMiAtMTcgLTV6Ii8+CjxwYXRoIGQ9Ik00MjQ4IDM0OTMgYzcgLTMgMTYgLTIgMTkgMSA0IDMgLTIgNiAtMTMgNSAtMTEgMCAtMTQgLTMgLTYgLTZ6Ii8+CjxwYXRoIGQ9Ik00ODU4IDM0OTMgYzcgLTMgMTYgLTIgMTkgMSA0IDMgLTIgNiAtMTMgNSAtMTEgMCAtMTQgLTMgLTYgLTZ6Ii8+CjxwYXRoIGQ9Ik02MTMwIDI5OTYgYzAgLTIgOCAtMTAgMTggLTE3IDE1IC0xMyAxNiAtMTIgMyA0IC0xMyAxNiAtMjEgMjEgLTIxCjEzeiIvPgo8cGF0aCBkPSJNNDM5OCAyODgzIGMxMiAtMiAzMiAtMiA0NSAwIDEyIDIgMiA0IC0yMyA0IC0yNSAwIC0zNSAtMiAtMjIgLTR6Ii8+CjxwYXRoIGQ9Ik00NzEzIDI4ODMgYzkgLTIgMjMgLTIgMzAgMCA2IDMgLTEgNSAtMTggNSAtMTYgMCAtMjIgLTIgLTEyIC01eiIvPgo8cGF0aCBkPSJNNDMxOCAyODczIGM3IC0zIDE2IC0yIDE5IDEgNCAzIC0yIDYgLTEzIDUgLTExIDAgLTE0IC0zIC02IC02eiIvPgo8cGF0aCBkPSJNNDgwOCAyODczIGM3IC0zIDE2IC0yIDE5IDEgNCAzIC0yIDYgLTEzIDUgLTExIDAgLTE0IC0zIC02IC02eiIvPgo8cGF0aCBkPSJNNjMzMCAyODI1IGMxOSAtMTkgMzYgLTM1IDM5IC0zNSAzIDAgLTEwIDE2IC0yOSAzNSAtMTkgMTkgLTM2IDM1Ci0zOSAzNSAtMyAwIDEwIC0xNiAyOSAtMzV6Ii8+CjxwYXRoIGQ9Ik02NDYwIDI2OTcgYzAgLTIgMTUgLTE2IDMzIC0zMyBsMzIgLTI5IC0yOSAzMyBjLTI4IDMwIC0zNiAzNyAtMzYKMjl6Ii8+CjxwYXRoIGQ9Ik01ODc1IDI0MDAgYzEwIC0xMSAyMCAtMjAgMjMgLTIwIDMgMCAtMyA5IC0xMyAyMCAtMTAgMTEgLTIwIDIwIC0yMwoyMCAtMyAwIDMgLTkgMTMgLTIweiIvPgo8cGF0aCBkPSJNNjA3NSAyMjAwIGMxMCAtMTEgMjAgLTIwIDIzIC0yMCAzIDAgLTMgOSAtMTMgMjAgLTEwIDExIC0yMCAyMCAtMjMKMjAgLTMgMCAzIC05IDEzIC0yMHoiLz4KPHBhdGggZD0iTTI1MDMgMTUxMyBjMzEzIC0yIDgyMSAtMiAxMTMwIDAgMzA5IDEgNTQgMiAtNTY4IDIgLTYyMSAwIC04NzQgLTEKLTU2MiAtMnoiLz4KPC9nPgo8L3N2Zz4K" alt="" />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-auto">
            <div className="row">
              <div className="col-auto text-color__white">
                <h1>УСПД</h1>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="col-auto text-color__light-blue">
                <h1>SMART</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-auto text-color__white">
                <span>АО "Связь инжиниринг М"</span>
              </div>
            </div>
          </div>
          <div className="col-auto margin-left-auto">
            {state.isAuthenticated ? (
              <>
                <button
                    className="btn btn-outline-secondary reload mr"
                    onClick={() => deviceRestartService.saveData()}
                    title="Перезагрузка"
                >
                </button>
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
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
      <div className="App">{!state.isAuthenticated ? <></> : <Home />}</div>
      <div className="app-version">{version}</div>
      <Switch>
        <Route
          key={'login'}
          history={history}
          path={'/login'}
          component={Login}
        />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
