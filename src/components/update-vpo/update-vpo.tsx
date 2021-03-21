import React from 'react';
// import ButtonAsync from '../common/button-async/button-async';
import MessagePopup from '../common/message-popup/message-popup';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const UpdateVpo = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  return (
    <React.Fragment>
      {state.handleMessage ? (
        <MessagePopup
          message={state.handleMessage}
          close={() => setDataSource({ handleMessage: null })}
        />
      ) : (
        <></>
      )}
      <div className="main-content">
        <div className="col">
          <div className="scroll-container">
            <div className="scroll-view">
              <div className="row vertical group-panel">
                <div className="col">
                  <label>{'Обновление ВПО UM31SMART'.toUpperCase()}</label>
                </div>
                <div className="col">
                  <div className="row no-gutters-2 center-v">
                    <div className="col-auto">
                      <form
                        encType="multipart/form-data"
                        method="post"
                        action="http://192.168.202.230/upload/firmware"
                      >
                        <input type="file" name="file" className="btn btn-primary" />
                        &nbsp;&nbsp;&nbsp;
                        <input
                          className="btn btn-outline-secondary"
                          type="submit"
                          value="Загрузка файла ВПО UM31SMART"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row vertical group-panel">
                <div className="col">
                  <label>{'Обновление загрузчика'.toUpperCase()}</label>
                </div>
                <div className="col">
                  <div className="row no-gutters center-v">
                    <div className="col-auto">
                      <form
                        encType="multipart/form-data"
                        method="post"
                        action="/upload/loader"
                      >
                        <input type="file" name="file" className="btn btn-primary" />
                        &nbsp;&nbsp;&nbsp;
                        <input
                          className="btn btn-outline-secondary"
                          type="submit"
                          value="Загрузка файла загрузчика"
                        />
                      </form>
                    </div>
                    <div className="col-auto">
                      <form method="post" action="/action/update/loader">
                        &nbsp;&nbsp;&nbsp;
                        <input type="submit" className="btn btn-outline-secondary" value="Обновление загрузчика" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UpdateVpo;
