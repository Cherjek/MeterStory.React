import React from 'react';
import { SidebarMenu, getSideBarItems } from '../../common/sidebar-menu/sidebar-menu';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // withRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './meter-data.scss';

const history = createBrowserHistory();
const MeterData = () => {
  let sidebarItems = [
    ...getSideBarItems(), 
    // ...meterDataViewTypes[0], 
    // ...meterDataViewTypes[1], 
    // ...meterDataViewTypes[2]
  ];
  return (
    <div className="main-content">
      <div className="col-3">
        <SidebarMenu notAnchor={true} />        
      </div>
      <div className="col">
        <div className="margin-correct">
          <Router>
            <Switch>
              {sidebarItems?.map((route, index) => (
                <Route
                  key={index}
                  history={history}
                  path={route.url}
                  component={route.component}
                />
              ))}              
              <Redirect from="/meter/data-view" to="/meter/data-view/meters" />
            </Switch>
          </Router>
        </div>                
      </div>
    </div>
  );
}

export default MeterData;