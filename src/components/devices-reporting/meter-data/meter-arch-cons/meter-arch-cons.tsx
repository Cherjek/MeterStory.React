import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterArchConsRoutes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import './meter-arch-cons.scss';

const history = createBrowserHistory();
const MeterArchCons = () => {
  const mainPath = '/meter/data-view/meters/consumption';
  const menus = meterArchConsRoutes.map(menu => {
      const _menu = {...menu};
      _menu.url = `${mainPath}${_menu.url}`;
      return _menu;
    });
  return (
    <div className="">
      <div className="col">
        <div className="panelBorder">
          <SidebarMenu items={menus} tabView={true} />
        </div>
        <Switch>
          {menus?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/meter/data-view/meters/consumption" to="/meter/data-view/meters/consumption/day" />
        </Switch>
      </div>
    </div>
  );
};
export default MeterArchCons;
