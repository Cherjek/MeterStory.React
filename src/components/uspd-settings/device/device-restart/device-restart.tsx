import React, { useReducer } from 'react';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { DeviceRestartService } from './services/device-restart-service';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const deviceRestartService = new DeviceRestartService();
const DeviceRestartSettings = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
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
      <div className="scroll-container">
        <div className="scroll-view tab">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'ПЕРЕЗАГРУЗКА'}</label>
            </div>
            <div className="col">&nbsp;</div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Перезагрузка"
                    clickAsync={() => {
                      return deviceRestartService.saveData();
                    }}
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DeviceRestartSettings;
