import React, { useEffect, useReducer } from 'react';
import { DataGridColumn, DataGridColumnType } from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import Modal from '../../../common/modal/modal';
import { NetworkSrvSettingsService, typeServer } from './services/network-srv-settings-service';
import { NetworkSrvSettings as NetworkSrvSettingsObj } from './services/models/network-srv-settings';
const initialState = {
  dataSource: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const networkSrvSettingsService = new NetworkSrvSettingsService();
const NetworkSrvSettings = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    {
      code: 'port',
      name: 'Порт',
      type: DataGridColumnType.Int,
      width: 100
    },
    {...{
      code: 'type',
      name: 'Тип сервера',
      type: DataGridColumnType.Combobox,
      width: 250
    }, ...{values: typeServer}},
    {
      code: 'state',
      name: 'Разрешение включения',
      type: DataGridColumnType.Bool
    },
    {
      code: 'cert',
      name: 'Cертификат сервера',
      type: DataGridColumnType.String
    },
    {
      code: 'key',
      name: 'Ключ сервера',
      type: DataGridColumnType.String
    }
  ];
  const gridSettings = {...new DataGridSettings(), ...{ isRowDelete: true, isHorizontalScroll: false }};
  const onCellEdit = (val) => {
    if (val.col.code === 'cert'
    || val.col.code === 'key') {
      if (val.row[val.col.code]) {
        setDataSource({ showDialog: true, cellClick: { editRow: val.row, editCol: val.col } });
      }
    }
  }
  useEffect(() => {
    let mounted = true;

    networkSrvSettingsService
    .getData()
      .then(
        (
          result: NetworkSrvSettingsObj[]
        ) => {
          if (mounted) {
            setDataSource({ dataSource: result });
          }
        }
      )
      .catch((err) => console.log(err));

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
      <Modal 
          isShown={state.showDialog}
          value={state?.cellClick?.editRow[state?.cellClick?.editCol.code]}
          headerText={state?.cellClick?.editCol.name}
          onOk={(res) => state.cellClick.editRow[state?.cellClick?.editCol.code] = res }
          onClose={() => setDataSource({ showDialog: null })}
        />
      <div className="scroll-container">
        <div className="scroll-view tab">

          <div className="row vertical group-panel">
            <div className="col">
              <label>
                {'Настройки HTTP сервера'.toUpperCase()}
              </label>
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings}
                columns={columns}
                dataSource={state.dataSource}
                onCellEdit={(val) => onCellEdit(val)}
              />
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Записать"
                    clickAsync={() =>
                      networkSrvSettingsService.saveData(state.dataSource)
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
                    clickAsync={() => networkSrvSettingsService.clearData().then(() => setDataSource({ dataSource: null })) }
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
}
export default NetworkSrvSettings;