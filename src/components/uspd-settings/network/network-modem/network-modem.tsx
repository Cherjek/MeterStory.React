import React, { useEffect, useReducer } from 'react';
import {
  DataGridColumn,
  DataGridColumnType,
} from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { NetworkApnService } from './services/network-apn-service';
import { NetworkApn } from './services/models/network-apn';
import { NetworkModemService, modemAccess } from './services/network-modem-service';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const networkApnService = new NetworkApnService();
const networkModemService = new NetworkModemService();
const NetworkModem = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100,
    },
    {
      code: 'addr',
      name: 'Адрес',
      type: DataGridColumnType.String
    },
    {
      code: 'auth',
      name: 'Авторизация',
      type: DataGridColumnType.Bool,
    },
    {
      code: 'login',
      name: 'Логин',
      type: DataGridColumnType.String,
    },
    {
      code: 'password',
      name: 'Пароль',
      type: DataGridColumnType.String,
    },
    {
      code: 'enable',
      name: 'Разрешение подключения',
      type: DataGridColumnType.Bool,
    }
  ];
  const columns2: DataGridColumn[] = [
    {...{
      code: 'access',
      name: 'Технология доступа к сети',
      type: DataGridColumnType.Combobox
    }, ...{values: modemAccess}},
    {
      code: 'pin',
      name: 'PIN код SIM-карты',
      type: DataGridColumnType.String
    },
  ];
  const gridSettings = {
    ...new DataGridSettings(),
    ...{ isRowDelete: false, isHorizontalScroll: false },
  };
  const gridSettings2 = {
    ...new DataGridSettings(),
    ...{ isRowAdd: false, isRowDelete: false, isHorizontalScroll: false },
  };
  useEffect(() => {
    let mounted = true;

    Promise.all([
      networkModemService.getData(),
      networkApnService.getData()
    ])
    .then(
      (result: [any[], NetworkApn[]]) => {
        if (mounted) {
          setDataSource({ modemSource: result[0], dataSource: result[1] });
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
              <label>{'Настройки модема'.toUpperCase()}</label>
            </div>
            <div className="col">
              &nbsp;
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings2}
                columns={columns2}
                dataSource={state.modemSource}
              />
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Записать"
                    clickAsync={() =>
                      networkModemService.saveData(state.modemSource)
                    }
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  />
                </div>
                <div className="col-auto">
                  {/* <ButtonAsync
                    className="btn btn-outline-secondary"
                    content="Очистить"
                    clickAsync={() =>
                      networkSrvSettingsService
                        .clearData()
                        .then(() => setDataSource({ dataSource: null }))
                    }
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Настройки APN'.toUpperCase()}</label>
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
                      networkApnService.saveData(state.dataSource)
                    }
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  />
                </div>
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-outline-secondary"
                    content="Очистить"
                    clickAsync={() =>
                      networkApnService
                        .clearData()
                        .then(() => setDataSource({ dataSource: null }))
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
export default NetworkModem;
