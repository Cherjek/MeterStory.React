import React from 'react';
import { SidebarMenu } from '../../common/sidebar-menu/sidebar-menu';
import { DataGridColumn, DataGridColumnType } from '../../common/data-grid/columns';
import DataGrid from '../../common/data-grid/data-grid';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../common/button-async/button-async';
import MessagePopup from '../../common/message-popup/message-popup';
import { SntpSettingsService } from './services/sntp-settings-service';
import { SntpSettings } from './services/models/sntp-settings';
import { TimeSettingsService } from './services/time-settings-service';
import { TimeSettings as TimeSettingsObj } from './services/models/time-settings';
import { SntpActionSettingsService, eventType } from './services/sntp-action-settings-service';
import { SntpActionSettings } from './services/models/sntp-action-settings';
import { TimeService } from './services/time-service';
import { Time } from './services/models/time';
import { TypeEventsColumns } from '../../data-exchange/shared/services/data-grid-columns-callback';

import './time-settings.scss'

const initialState = {
  sourceSntpSettings: null,
  sourceSntpActionSettings: null,
  localTimeSettings: null,
  time: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const sntpSettingsService = new SntpSettingsService();
const timeSettingsService = new TimeSettingsService();
const sntpActionSettingsService  = new SntpActionSettingsService();
const timeService = new TimeService();
const TimeSettings = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    {
      code: 'addr',
      name: 'Адрес',
      type: DataGridColumnType.String
    },
    {
      code: 'port',
      name: 'Порт',
      type: DataGridColumnType.String
    }    
  ];
  const columns1: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    ...TypeEventsColumns
  ];
  const gridSettings = {...new DataGridSettings(), ...{ isRowDelete: false }};
  React.useEffect(() => {
    let mounted = true;

    Promise.all([
      sntpSettingsService.getData(),
      timeSettingsService.getData(),
      sntpActionSettingsService.getData(),
      timeService.getData()
    ])
      .then(
        (
          result: [
            SntpSettings[],
            TimeSettingsObj,
            SntpActionSettings[],
            Time
          ]
        ) => {
          const BigDataSource = {
            sourceSntpSettings: result[0],
            localTimeSettings: result[1] || new TimeSettingsObj(),
            sourceSntpActionSettings: result[2],
            time: result[3]
          };
          if (mounted) {
            setDataSource(BigDataSource);
          }
        }
      )
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    }
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
                <label id="settime">{'Установка времени'.toUpperCase()}</label>
              </div>
              <div className="col padding-top-10">
                <div className="row">
                  <div className="col-3 table-time-info border-right-style">
                    <table>
                      <tbody>
                        <tr><td><label className="labelColor">Время устройства</label></td></tr>
                        <tr><td><label>{state?.time?.time}</label></td></tr>
                        <tr className="br-tr"></tr>
                        <tr><td><label className="labelColor">Время внутренних ЧРВ</label></td></tr>
                        <tr><td><label>{state?.time?.intRTC.time || '[нет данных]'}</label></td></tr>
                        <tr className="br-tr"></tr>
                        <tr><td><label className="labelColor">Время внешних ЧРВ</label></td></tr>
                        <tr><td><label>{state?.time?.extRTC.time}</label></td></tr>
                        <tr className="br-tr"></tr>
                        <tr><td><label className="labelColor">Тип внешних ЧРВ</label></td></tr>
                        <tr><td><label>{state?.time?.extRTC.type}</label></td></tr>
                        <tr className="br-tr"></tr>
                        <tr><td><label className="labelColor">Температура внешних ЧРВ</label></td></tr>
                        <tr><td><label>{state?.time?.extRTC.temperature}</label></td></tr>
                      </tbody>                      
                    </table>
                  </div>
                  <div className="col">
                    <div className="row gutters">
                      <div className="col-12">
                        <input
                          className="form-control input-full-width"
                          placeholder="Время устройства"
                          value={state?.time?.settime}
                          onChange={event =>
                            setDataSource({ time: { ...state.time, ...{ settime: event.target.value } } })
                          }
                        />
                        <br/>
                      </div>
                      <div className="col-12">
                        <div className="row no-gutters-2 center-v">
                          <div className="col-6"><label className="labelColor">Часы синхронизированы</label></div>
                          <div className="col-auto">
                            <input
                              className="form-control"
                              type="checkbox"
                              readOnly
                              checked={state?.time?.sync}
                            />
                          </div>
                        </div>    
                        <br/>                    
                      </div>
                      <div className="col-12">
                        <div className="row no-gutters-2 center-v">
                          <div className="col-6"><label className="labelColor">Состояние внешних ЧРВ</label></div>
                          <div className="col-auto">
                            <input
                              className="form-control"
                              type="checkbox"
                              readOnly
                              checked={state?.time?.extRTC.osc}
                            />
                          </div>
                        </div>
                        <br/>
                      </div>
                      <div className="col-12">
                        <div className="row no-gutters-2 center-v">
                          <div className="col-6"><label className="labelColor">Режим поверки внешних ЧРВ</label></div>
                          <div className="col-auto">
                            <input
                              className="form-control"
                              type="checkbox"
                              readOnly
                              checked={state?.time?.extRTC.verify}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-primary"
                      content="Записать"
                      clickAsync={() =>
                        timeSettingsService.saveData(state?.localTimeSettings)
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-outline-secondary"
                      content="Выполнить синхронизацию"
                      clickAsync={() =>
                        timeService.syncTime()
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-outline-secondary"
                      content="Включить поверку внешних ЧРВ"
                      clickAsync={() =>
                        timeService.verifyOn()
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-outline-secondary"
                      content="Выключить поверку внешних ЧРВ"
                      clickAsync={() =>
                        timeService.verifyOff()
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="localtime">
                  {'Настройка локального времени'.toUpperCase()}
                </label>
              </div>
              <div className="col padding-top-10">
                <label className="labelColor">Часовой пояс</label>
                <div className="row no-gutters-2 center-v">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Часовой пояс"
                      type="number"
                      value={state.localTimeSettings?.tz}
                      onChange={event =>
                        setDataSource({ localTimeSettings: { ...state.localTimeSettings, 
                          ...{ 
                            tz: (() => {
                              if (event.target.value !== '') {
                                const valNumber = Number(event.target.value);
                                if (!isNaN(valNumber)) {
                                  return valNumber;
                                }
                              }
                              return event.target.value;
                            })()
                          } 
                        }})
                      }
                    />
                  </div>
                  <div className="col">                    
                    <div className="row no-gutters-2 center">
                      <div className="col-auto">
                       <label>Разрешение смены сезонов</label>
                      </div>
                      <div className="col-auto">
                        <input
                          className="form-control"
                          placeholder="Разрешение смены сезонов"
                          type="checkbox"
                          checked={state.localTimeSettings?.dst}
                          onChange={event =>
                            setDataSource({ localTimeSettings: { ...state.localTimeSettings, ...{ dst: Boolean(event.target.checked) } } })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-primary"
                      content="Записать"
                      clickAsync={() =>
                        timeSettingsService.saveData(state?.localTimeSettings)
                      }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="serverssync">
                  {'Сервера синхронизации времени'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid
                  settings={gridSettings}
                  columns={columns}
                  dataSource={state.sourceSntpSettings}
                />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-primary"
                      content="Записать"
                      clickAsync={() =>
                        sntpSettingsService.saveData(state.sourceSntpSettings)
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
                      clickAsync={() => sntpSettingsService.clearData().then(() => setDataSource({ sourceSntpSettings: null })) }
                      onMessage={(message: any) =>
                        setDataSource({ handleMessage: message })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="conditionssync">
                  {'Условия синхронизации времени'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid
                  settings={gridSettings}
                  columns={columns1}
                  dataSource={state.sourceSntpActionSettings}
                />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-primary"
                      content="Записать"
                      clickAsync={() =>
                        sntpActionSettingsService.saveData(
                          state.sourceSntpActionSettings
                        )
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
                      clickAsync={() => sntpActionSettingsService.clearData().then(() => setDataSource({ sourceSntpActionSettings: null })) }
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
      </div>
    </div>
  );
}
export default TimeSettings;