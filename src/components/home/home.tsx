import React from 'react';
// import { AuthContext } from '../app/app';
import { MainMenu, generateListRoutes } from '../common/main-menu/main-menu';
import './home.scss';
import {
  Route,
  Switch,
  Redirect,
  // withRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export const Home = () => {
  // const { state: authState } = React.useContext(AuthContext);
  const routes = generateListRoutes();
  // React.useEffect(() => {
  // }, [authState.token]);
  return (
    <React.Fragment>
      <div className="home">
        <MainMenu />
        <Switch>
          {routes.map(route => (
            <Route
              key={route.code}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/meter/settings/table" />
        </Switch>
      </div>
    </React.Fragment>
  );
};
export default Home;