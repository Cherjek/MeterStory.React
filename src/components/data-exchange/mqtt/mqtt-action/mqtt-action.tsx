import React, { useEffect } from 'react';
import {
  DataGridColumn,
  DataGridColumnType,
} from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { TypeEventsColumns, TypeTemplateColumns, MqttBrokersColumns } from '../../shared/services/data-grid-columns-callback';
import { MqttActionService } from './services/mqtt-action-service';
import { MqttActionSettings } from './services/models/mqtt-action-settings';

const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const mqttActionService = new MqttActionService();
const MqttAction = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    ...TypeEventsColumns, 
    ...TypeTemplateColumns, 
    ...MqttBrokersColumns,
    {
      code: 'topic',
      name: 'Текст сообщения',
      type: DataGridColumnType.String
    }
  ]
  useEffect(() => {
    let mounted = true;

    mqttActionService
    .getData()
      .then(
        (
          result: MqttActionSettings[]
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
      <div className="scroll-container">
        <div className="scroll-view tab">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Настройки формирования публикаций'.toUpperCase()}</label>
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
                      mqttActionService.saveData(state.dataSource)
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
                      mqttActionService
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
export default MqttAction;
