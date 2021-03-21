import React, { useEffect, useReducer } from 'react';
import './meter-data-journal.scss';
import DatePicker from '../../../common/date-picker/date-picker';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import ComboBox from '../../../common/combo-box/combo-box';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import { DataGridColumn, DataGridColumnType } from '../../../common/data-grid/columns';
import { MeterDataJournalService } from './services/meter-data-journal-service';
import { MeterJournalRequest } from './services/models/request-data';
import { TimeJournal } from './services/models/time-journal';
import { MeterSettingsTableService } from '../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { MeterSettingsTable } from '../../meter-settings/meter-settings-table/services/models/meter-settings-table';

const initialState = {
  dataSource: null,
  puDataSource: null
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const meterDataJournalService = new MeterDataJournalService();
const meterSettingsTableService = new MeterSettingsTableService();
const MeterDataJournal = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.String
    },    
    {
      code: 'serial',
      name: 'Серийный номер',
      type: DataGridColumnType.String,
      width: 250
    },
    {
      code: 'type',
      name: 'Журнал',
      type: DataGridColumnType.String,
      width: 100
    },
    {
      code: 'time',
      name: 'Метка времени',
      type: DataGridColumnType.String,
      width: 150
    },
    {
      code: 'timediff',
      name: 'Расхождение времени',
      type: DataGridColumnType.String,
      width: 150
    },
    {
      code: 'eId',
      name: 'Идентификатор события',
      type: DataGridColumnType.String,
      width: 150
    },
    {
      code: 'etype',
      name: 'Тип события',
      type: DataGridColumnType.String,
      width: 150
    },
  ];
  const gridSettings = {...new DataGridSettings(), ...{ readOnly: true/*, isHorizontalScroll: true*/ }};
  
  useEffect(() => {
    meterSettingsTableService
      .getData()
      .then((res: MeterSettingsTable[]) => setDataSource({ puDataSource: res.map(pu => ({ id: pu.id, name: `(${pu.id}) ${pu.type}, ${pu.iface}, ${pu.addr}` })) }))
      .catch((err) => console.log(err));
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
              <label>
                {'Журналы'.toUpperCase()}
              </label>
            </div>
            <div className="col padding-top-10">
              <table className="grid-journal">
                <thead>
                  <tr>
                    <th>ID прибора учета</th>
                    <th>Начало данных</th>
                    <th>Конец данных</th>
                    <th>Выбор журнала</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ComboBox
                        uniqueId="pu"
                        keyField="id"
                        valueField="name"
                        dataSource={state.puDataSource}
                        onSelected={(val) => setDataSource({ pu: val })}
                      />
                    </td>
                    <td>
                      <DatePicker
                        onChange={(jsDate, dateString) => setDataSource({ dateStart: dateString })}
                        placeholder="начало данных"
                        onClear={() => { }}
                      />
                    </td>
                    <td>
                      <DatePicker
                        onChange={(jsDate, dateString) => setDataSource({ dateEnd: dateString })}
                        placeholder="конец данных"
                        onClear={() => { }}
                      />
                    </td>
                    <td>
                      <ComboBox
                        uniqueId="journal"
                        keyField="code"
                        valueField="name"
                        dataSource={meterDataJournalService.getJournals()}
                        onSelected={(val) => setDataSource({ journal: val })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Показать"
                    clickAsync={() => {
                      return new Promise((resolve, reject) => {
                          const req = new MeterJournalRequest();
                          req.ids = [state.pu.id];
                          req.measures = [state.journal.code];
                          const timeJournal = new TimeJournal();
                          if (state.dateStart) {
                            timeJournal.start = state.dateStart;
                          }
                          if (state.dateEnd) {
                            timeJournal.end = state.dateEnd;
                          }
                          req.time = [timeJournal];
                          meterDataJournalService
                          .getJournalRecord(req)
                          .then((result) => {
                            setDataSource({ journalRecords: result })
                            resolve();
                          })
                          .catch(() => reject('Произошла ошибка!'))
                        })
                      }
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
              <label>
                {'Записи журналов'.toUpperCase()}
              </label>
            </div>
            <div className="col padding-top-10">
              <DataGrid
                settings={gridSettings}
                columns={columns}
                dataSource={state.journalRecords}
              />
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default MeterDataJournal;