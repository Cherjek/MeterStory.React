import React, { Fragment, useEffect, useReducer, useRef } from 'react';
import ButtonAsync from '../../../../../../common/button-async/button-async';
import ComboBox from '../../../../../../common/combo-box/combo-box';
import DataGrid from '../../../../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../../../../common/data-grid/data-grid-settings';
import MessagePopup from '../../../../../../common/message-popup/message-popup';
import { MeterSettingsTableService, getIndexGroupTypeMeter } from '../../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { MeterSettingsTable } from '../../../../../meter-settings/meter-settings-table/services/models/meter-settings-table';
import { MeterDataInfoService } from '../../../services/meter-data-info-service';
import './period-data-info.scss';
import DatePicker from '../../../../../../common/date-picker/date-picker';

const initialState = {
  dataSource: null,
  puDataSource: null,
  groupPuIndex: null
};
const reducer = (state: any, action: any) => {
  //console.log(JSON.stringify(action));
  return { ...state, ...action };
};
const meterSettingsTableService = new MeterSettingsTableService();
const PeriodDataInfo = (props) => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  // const startTime = useRef(null);
  // const endTime = useRef(null);
  const gridSettings = {
    ...new DataGridSettings(),
    ...{ readOnly: true, isHorizontalScroll: true },
  };

  const globalService = new (props?.data?.service || MeterDataInfoService)();

  useEffect(() => {
    meterSettingsTableService
      .getData()
      .then((res: MeterSettingsTable[]) =>
        setDataSource({
          puDataSource: res.map((pu) => ({
            id: pu.id,
            name: `(${pu.id}) ${pu.type}, ${pu.iface}, ${pu.addr}`,
            type: getIndexGroupTypeMeter(`${pu.type}`)
          })),
        })
      )
      .catch((err) => console.log(err));

    let data = { tagsView: globalService.tagsView }
    if (props?.data?.groupsPu) {
      data = { ...data, ...{ groupPuIndex: props?.data?.groupsPu[0].id }};
    }
    setDataSource(data);
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
        <div className="scroll-view tab-2">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Выбор прибора учета'.toUpperCase()}</label>
            </div>
            <div className="col padding-top-10">
              {props?.data?.showDuration && (
                <Fragment>
                  <div className="row no-gutters-2">
                    <div className="col">
                    </div>
                    <div className="col-auto min-width-period-column">
                      <label id="startData">Начало данных</label>
                    </div>
                    <div className="col-auto min-width-period-column">
                      <label id="endData">Конец данных</label>
                    </div>
                  </div>
                </Fragment>
              )}
              <div className="row no-gutters-2">
                {
                  props?.data?.groupsPu && (
                    <div className={ props.data.groupsPu.length === 1 ? 'disabled-tag' : undefined }>
                      <ComboBox
                        uniqueId="groupsPu"
                        keyField="id"
                        valueField="name"
                        defSelectValue={props.data.groupsPu[0]}
                        dataSource={props.data.groupsPu}
                        onSelected={(val) => setDataSource({ groupPuIndex: val.id })}
                      />
                    </div>
                  )
                }
                <div className="col">
                  <ComboBox
                    uniqueId="pu"
                    keyField="id"
                    valueField="name"
                    dataSource={state.groupPuIndex != null ? state.puDataSource?.filter(x => x.type === state.groupPuIndex) : state.puDataSource}
                    onSelected={(val) => setDataSource({ pu: val })}
                  />
                </div>
                {props?.data?.showDuration && (
                  <Fragment>
                    <div className="col-auto min-width-period-column">
                      {/* <input
                        ref={startTime}
                        id="startData"
                        className="form-control"
                        type="time"
                      /> */}
                      <DatePicker
                        onChange={(jsDate, dateString) => setDataSource({ startTime: dateString })}
                        placeholder="начало данных"
                      />
                    </div>
                    <div className="col-auto min-width-period-column">
                      {/* <input
                        ref={endTime}
                        id="endData"
                        className="form-control"
                        type="time"
                      /> */}
                      <DatePicker
                        onChange={(jsDate, dateString) => setDataSource({ endTime: dateString })}
                        placeholder="конец данных"
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="col">
              <hr />
            </div>
            <div className="col">
              <table className="table-tag">
                <thead>
                  <tr>
                    {globalService.tagsView.map((tv, index) => (
                      <th key={index}>{tv.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {state?.tagsView?.map((tv, index) => (
                      <td key={index}>
                        <input
                          type="checkbox"
                          checked={tv.checked}
                          onChange={(event) => {
                            const tagView = state.tagsView.find(
                              (x) => x.code === tv.code
                            );
                            tagView.checked = event.target.checked;
                            setDataSource({
                              tagsView: [...state.tagsView],
                            });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row no-gutters-2 center">
              <div className="col-auto">
                <ButtonAsync
                  className="btn btn-primary"
                  content="Считать"
                  clickAsync={() =>
                    new Promise((resolve, reject) => {
                      const start = state.startTime;//?.current?.value;
                      const end = state.endTime;//?.current?.value;
                      const startEnd = () =>
                        props?.data?.showDuration &&
                        (start && Object.keys(start).length) &&
                        (end && Object.keys(end).length);
                      globalService.tagsView = state.tagsView;
                      globalService
                        .getData(
                          props?.data?.measureCode,
                          state?.pu?.id,
                          startEnd() && [{ start, end }]
                        )
                        .then((result) => {
                          setDataSource({ dataSource: result });
                          resolve();
                        })
                        .catch(() => reject('Произошла ошибка!'));
                    })
                  }
                  onMessage={(message: any) => {
                    if(message && message.code === 'error' && !message.text) {
                      message.text = 'Произошла ошибка';
                    }
                    return setDataSource({ handleMessage: message });
                  }
                  }
                />
              </div>
            </div>
          </div>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{props?.data?.tableHeader?.toUpperCase()}</label>
            </div>
            <div className="col pd-info-data-grid">
              <DataGrid
                settings={gridSettings}
                columns={globalService.columns}
                dataSource={state.dataSource}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PeriodDataInfo;
