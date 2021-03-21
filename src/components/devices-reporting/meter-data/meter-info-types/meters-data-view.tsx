import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { meterDataViewTypes } from '../../../common/main-menu/main-menu';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';

const history = createBrowserHistory();
const MetersDataView = () => {
  const path = window.location.pathname;
  const indexType = path.includes('/meter/data-view/meters') ? 0 :
          path.includes('/meter/data-view/puls-meters') ? 1 :
          path.includes('/meter/data-view/discrete-modules') ? 2 : -1;
  let defUrl = indexType >= 0 ? meterDataViewTypes[indexType][0].url : '';
  return (
    <div className="">
      <div className="col">
        <div className="panelBorder">
          <SidebarMenu items={meterDataViewTypes[indexType]} tabView={true} />
        </div>
        <Switch>
          {meterDataViewTypes[indexType]?.map((route, index) => (
            <Route
              key={index}
              history={history}
              path={route.url}
              component={route.component}
            />
          ))}
          <Redirect from="/" to={defUrl + '/current'} />
        </Switch>
      </div>
    </div>
  );
};
export default MetersDataView;
