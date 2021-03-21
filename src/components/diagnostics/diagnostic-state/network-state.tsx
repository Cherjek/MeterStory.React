import React, { useEffect } from 'react';
import {
  DataGridColumn,
  DataGridColumnType
} from '../../common/data-grid/columns';
import DataGrid from '../../common/data-grid/data-grid';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
import MessagePopup from '../../common/message-popup/message-popup';

import { NetworkStateService } from './services/network-state-service';

const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const networkStateService = new NetworkStateService();
const NetworkState = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ 
    isRowDelete: false, 
    isRowAdd: false, 
    readOnly: true, 
    isHorizontalScroll: true
  }};
  const columns1: DataGridColumn[] = [
    {
      code: 'name',
      name: 'Имя',
      type: DataGridColumnType.String
    },
    {
      code: 'ipaddr',
      name: 'IP адрес',
      type: DataGridColumnType.String
    },
    {
      code: 'netmask',
      name: 'Маска сети',
      type: DataGridColumnType.String
    },
    {
      code: 'gateway',
      name: 'Шлюз',
      type: DataGridColumnType.String
    },
    {
      code: 'hostname',
      name: 'Имя хоста',
      type: DataGridColumnType.String
    },
    {
      code: 'link',
      name: 'Состояние подключения',
      type: DataGridColumnType.String
    }
  ];
  const columns2: DataGridColumn[] = [
    {
      code: 'id',
      name: 'Идентификатор сокета',
      type: DataGridColumnType.String
    },
    {
      code: 'sock',
      name: 'Сервер',
      type: DataGridColumnType.String
    },
    {
      code: 'peer',
      name: 'Клиент',
      type: DataGridColumnType.String
    }
  ];
  useEffect(() => {
    let mounted = true;

    networkStateService
      .getData()
      .then((result) => {
        if (mounted) {
          setDataSource({ ...result });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
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
        <div className="scroll-view">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Сетевые интерфейсы'.toUpperCase()}</label>
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings}
                columns={columns1}
                dataSource={state?.interfaces}
              />
            </div>
          </div>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Сокеты'.toUpperCase()}</label>
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings}
                columns={columns2}
                dataSource={state?.sockets}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default NetworkState;
