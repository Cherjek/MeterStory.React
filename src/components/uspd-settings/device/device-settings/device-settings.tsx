import React, { useEffect, useReducer } from 'react';
import {
  DataGridColumn,
  DataGridColumnType,
} from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { DeviceSettingsService } from './services/device-settings-service';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const deviceSettingsService = new DeviceSettingsService();
const DeviceSettingsProperty = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'name',
      name: 'Имя',
      type: DataGridColumnType.String
    }
  ];
  const gridSettings = {
    ...new DataGridSettings(),
    ...{ isRowAdd: false, isRowDelete: false, isHorizontalScroll: false },
  };
  useEffect(() => {
    let mounted = true;

    Promise.all([
      deviceSettingsService.getData()
    ])
    .then(
      (result: [any[]]) => {
        if (mounted) {
          setDataSource({ dataSource: result[0] });
        }
      }
    )

    return () => {
      mounted = false;
    }
  }, []);
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
              <label>{'Настройки устройства'.toUpperCase()}</label>
            </div>
            <div className="col">
              &nbsp;
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings}
                columns={columns}
                dataSource={state.dataSource}
              />
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Записать"
                    clickAsync={() =>
                      deviceSettingsService.saveData(state.dataSource)
                    }
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
export default DeviceSettingsProperty;
