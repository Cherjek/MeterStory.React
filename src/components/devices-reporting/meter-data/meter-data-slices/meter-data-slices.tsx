import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterDataSlicesRoutes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import './meter-data-slices.scss';

const history = createBrowserHistory();
const MeterDataSlices = () => {
  return (
    <div className="">
      <div className="col">
        <div className="panelBorder">
          <SidebarMenu items={meterDataSlicesRoutes} tabView={true} />
        </div>
        <Switch>
          {meterDataSlicesRoutes?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/meter/data-view/slices/config" />
        </Switch>
      </div>
    </div>
  );
};
export default MeterDataSlices;
