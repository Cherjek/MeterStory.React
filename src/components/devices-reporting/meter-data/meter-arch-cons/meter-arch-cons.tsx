import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterArchConsRoutes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import './meter-arch-cons.scss';

const history = createBrowserHistory();
const MeterArchCons = () => {
  return (
    <div className="">
      <div className="col">
        <div className="panelBorder">
          <SidebarMenu items={meterArchConsRoutes} tabView={true} />
        </div>
        <Switch>
          {meterArchConsRoutes?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/meter/data/consumption/day" />
        </Switch>
      </div>
    </div>
  );
};
export default MeterArchCons;
