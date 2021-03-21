import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterDataTabRoutes, meterDiscreteConsRoutes, meterPulsDataTabRoutes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import './meter-data-info.scss';

const history = createBrowserHistory();
const MeterDataInfo = () => {
  let menus = [];
  const routes = meterDataTabRoutes;
  const path = window.location.pathname;
  if (path.includes('/meter/data-view/meters')) { 
    const mainPath = '/meter/data-view/meters/info';
    menus = routes.map(menu => {
      const _menu = {...menu};
      _menu.url = `${mainPath}${_menu.url}`;
      return _menu;
    });
    menus.splice(3);
  } else if (path.includes('/meter/data-view/puls-meters')) {
    const mainPath = '/meter/data-view/puls-meters/info';
    menus = meterPulsDataTabRoutes.map((menu, index) => {
      const _menu = {...menu};
      _menu.url = `${mainPath}${_menu.url}`;      
      return _menu;
    });
  } else if (path.includes('/meter/data-view/discrete-modules')) {
    const mainPath = '/meter/data-view/discrete-modules/info';
    menus = meterDiscreteConsRoutes.map((menu) => {
      const _menu = {...menu};
      _menu.url = `${mainPath}${_menu.url}`;
      return _menu;
    });
  }  
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
          {/* <Redirect from="/" to="/meter/data-view/meters/info/current" /> */}
        </Switch>
      </div>
    </div>
  );
};
export default MeterDataInfo;
