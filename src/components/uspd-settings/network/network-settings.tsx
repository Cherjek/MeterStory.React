import React from 'react';
import { SidebarMenu, getSideBarItems } from '../../common/sidebar-menu/sidebar-menu';
import {
  Route,
  Switch,
  Redirect,
  // withRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const NetworkSettings = () => {
  const sidebarItems = getSideBarItems();
  return (
    <div className="main-content">
      <div className="col">
        <SidebarMenu tabView={true} />
        <Switch>
          {sidebarItems?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/uspd-settings/network/ip-settings" />
        </Switch>
      </div>
    </div>
  );
}
export default NetworkSettings;