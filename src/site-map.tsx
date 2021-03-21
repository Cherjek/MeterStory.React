import React from 'react';
import { generateListRoutes } from './components/common/main-menu/main-menu';

const SiteMap = () => {
  return <React.Fragment>
      <div className="main-content">
        <div className="col">
          <div className="scroll-container">
            <div className="scroll-view">
              {
                generateListRoutes()
                .map(x => {
                    return (
                      <React.Fragment>
                        <p>{x.url}</p>
                        {/* {x.submenu ? (
                          x.submenu.map((y) => y.url[0] !== '#' ? <p>{y.url}</p> : <></>)
                        ) : (
                          <></>
                        )} */}
                      </React.Fragment>
                    );
                })
              }
            </div>
          </div>
        </div>
      </div> 
    </React.Fragment>
}
export default SiteMap;