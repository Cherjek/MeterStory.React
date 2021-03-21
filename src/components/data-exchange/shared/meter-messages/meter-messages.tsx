import React, { useEffect } from 'react';
import {
  DataGridColumn,
  DataGridColumnType,
  DataGridComboboxColumnCallback,
  DataGridComboboxSource
} from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import {
  MeterMessagesService,
  protoValues,
  measures
} from '../services/meter-messages-service';
import { MeterMessage } from '../services/models/meter-message';
import { MeterTableService } from '../services/meter-table-service';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const meterMessagesService = new MeterMessagesService();
const MeterMessagesDataExchange = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100,
    },
    {
      ...{
        code: 'proto',
        name: 'Тип протокола',
        type: DataGridColumnType.Combobox,
        width: 250,
      },
      ...{ values: protoValues.slice(0, 3) },
    },
    Object.assign(new DataGridComboboxColumnCallback(), {
      code: 'MeterId',
      name: 'Прибор учета',
      type: DataGridColumnType.Combobox,
      source: new DataGridComboboxSource(new MeterTableService()),
      values: null
    }),
    {
      code: 'depth',
      name: 'Глубина запроса(секунды)',
      type: DataGridColumnType.Int,
    },
    {
      ...{
        code: 'Measure',
        name: 'Типы данных',
        type: DataGridColumnType.Combobox,
        width: 250,
      },
      ...{ values: measures.map(m => m[0]) },
    },
  ];
  useEffect(() => {
    let mounted = true;

    meterMessagesService
      .getData()
      .then((result: MeterMessage[]) => {
        if (mounted) {
          setDataSource({ dataSource: result });
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
        <div className="scroll-view tab">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Данные приборов учета'.toUpperCase()}</label>
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
                      meterMessagesService.saveData(state.dataSource)
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
                      meterMessagesService
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
export default MeterMessagesDataExchange;
