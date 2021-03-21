import React, { useEffect } from 'react';
import { SidebarMenu } from '../../common/sidebar-menu/sidebar-menu';
import ButtonAsync from '../../common/button-async/button-async';
import ComboBox from '../../common/combo-box/combo-box';
import MessagePopup from '../../common/message-popup/message-popup';
import { MeterSettingsTableService } from '../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { MeterSettingsTable } from '../meter-settings/meter-settings-table/services/models/meter-settings-table';
import { TimeService } from './services/time-service';
import { MeterSettingsTimeService } from './services/meter-settings-time-service';
import { MeterSettingsRelayService } from './services/meter-settings-relay-service';
import { DataGridColumn, DataGridColumnType } from '../../common/data-grid/columns';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
import DataGrid from '../../common/data-grid/data-grid';

const initialState = {
  handleMessage: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const meterSettingsTableService = new MeterSettingsTableService();
const timeService = new TimeService();
const meterSettingsTimeService = new MeterSettingsTimeService();
const meterSettingsRelayService = new MeterSettingsRelayService();
const MeterManagement = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ 
    isRowDelete: false, 
    isRowAdd: false, 
    readOnly: true
  }};
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.String
    },
    {
      code: 'serial',
      name: 'Серийный номер',
      type: DataGridColumnType.String
    },
    {
      code: 'time',
      name: 'Метка времени',
      type: DataGridColumnType.String
    },
    {
      code: 'timediff',
      name: 'Расхождение времени',
      type: DataGridColumnType.String
    }
  ];
  const columns2: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.String
    },
    {
      code: 'serial',
      name: 'Серийный номер',
      type: DataGridColumnType.String
    },
    {
      code: 'time',
      name: 'Метка времени',
      type: DataGridColumnType.String
    },
    {
      code: 'timediff',
      name: 'Расхождение времени',
      type: DataGridColumnType.String
    },
    {
      code: 'rId',
      name: 'Реле',
      type: DataGridColumnType.String
    },
    {
      code: 'state',
      name: 'Состояние реле',
      type: DataGridColumnType.String
    }
  ]
  const onSelectedPu = (val) => {
    setDataSource({ pu: val });
    getCurrentTime(val);
  }
  const getCurrentTime = (val) => {
    timeService
      .getData(val.id, 'mTime')
      .then(result => setDataSource({ currentTime: result }));
    timeService
      .getData(val.id, 'mRelay')
      .then(result => setDataSource({ momentRelay: result }));
  }
  useEffect(() => {
    meterSettingsTableService
      .getData()
      .then((res: MeterSettingsTable[]) => setDataSource({ puDataSource: res.map(pu => ({ id: pu.id, name: `(${pu.id}) ${pu.type}, ${pu.iface}, ${pu.addr}` })) }))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="main-content">
      <div className="col-3">
        <SidebarMenu />
      </div>
      <div className="col">
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
                <label>{'Выбор прибора учета'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <ComboBox
                  uniqueId="pu"
                  keyField="id"
                  valueField="name"
                  dataSource={state.puDataSource}
                  onSelected={(val) => onSelectedPu(val)}
                />
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="timestate">{'Текущее время'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <DataGrid
                  settings={gridSettings}
                  columns={columns}
                  dataSource={state?.currentTime}
                />
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="settime">{'Установка времени'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <ButtonAsync
                  disabled={state.pu == null}
                  className="btn btn-primary"
                  content="Установить время"
                  clickAsync={() =>
                    meterSettingsTimeService.saveData({ id: state.pu.id })
                  }
                  onMessage={(message: any) =>
                    setDataSource({ handleAppError: message })
                  }
                />
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="relaystate">{'Состояние реле'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <DataGrid
                  settings={gridSettings}
                  columns={columns2}
                  dataSource={state?.momentRelay}
                />
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="managrele">{'Управление реле'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <div className="row no-gutters-2 center-v">
                  <div className="col-auto">Номер реле</div>
                  <div className="col">
                    <input
                      className="form-control"
                      type="number"
                      onChange={(event) =>
                        setDataSource({ relayNumber: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-auto">Состояние реле</div>
                  <div className="col">
                    <input
                      className="form-control"
                      type="number"
                      onChange={(event) =>
                        setDataSource({ relayStateNumber: event.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <ButtonAsync
                      disabled={state.pu == null || (state.relayStateNumber == null && state.relayStateNumber == null)}
                      className="btn btn-primary"
                      content="Установить"
                      clickAsync={() =>
                        meterSettingsRelayService.saveData({
                          id: state.pu.id,
                          relayId: state.relayStateNumber,
                          relayState: state.relayStateNumber,
                        })
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleAppError: message })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MeterManagement;