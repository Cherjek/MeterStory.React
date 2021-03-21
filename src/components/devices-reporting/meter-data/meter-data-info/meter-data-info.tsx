import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterDataTabRoutes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import './meter-data-info.scss';

const history = createBrowserHistory();
const MeterDataInfo = () => {
  return (
    <div className="">
      <div className="col">
        <div className="panelBorder">
          <SidebarMenu items={meterDataTabRoutes} tabView={true} />
        </div>
        <Switch>
          {meterDataTabRoutes?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/meter/data/info/current" />
        </Switch>
      </div>
    </div>
  );
};
export default MeterDataInfo;
