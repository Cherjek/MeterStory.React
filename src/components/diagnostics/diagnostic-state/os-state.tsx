import React, { useEffect } from 'react';
import {
  DataGridColumn
} from '../../common/data-grid/columns';
import DataGrid from '../../common/data-grid/data-grid';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
import MessagePopup from '../../common/message-popup/message-popup';

import { SystemStateService } from './services/system-state-service';
import { FormInterface, IFormInterfaceService } from './form-interface';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const systemStateService = new SystemStateService();
const OsState = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const path = window.location.pathname;
  const gridSettings = { ...new DataGridSettings(), ...{ 
    isRowDelete: false, 
    isRowAdd: false, 
    readOnly: true, 
    isHorizontalScroll: true
  }};
  const formInterface = FormInterface[path];
  const formInterfaceService: IFormInterfaceService = formInterface.init();
  const columns : DataGridColumn[] = formInterfaceService.columns;
  useEffect(() => {
    let mounted = true;

    systemStateService
      .getDataInfo()
      .then((result) => {
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
        <div className="scroll-view">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Данные ОС'.toUpperCase()}</label>
            </div>
            <div className="col">
              <label>
                Операционная система: <span>{state.dataSource?.osname}</span>
                <br></br>
                Время работы: <span>{state.dataSource?.osruntime}</span>
              </label>
            </div>
          </div>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Менеджер памяти'.toUpperCase()}</label>
            </div>
            <div className="col">
              <label>
                Свободная память(heap): <span>{state.dataSource?.heapfree}</span>
                <br></br>
                Минимальное количество свободной памяти(heap): <span>{state.dataSource?.heapmin}</span>
              </label>
            </div>
          </div>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{formInterfaceService.caption.toUpperCase()}</label>
            </div>
            <div className="col">
              <DataGrid
                settings={gridSettings}
                columns={columns}
                dataSource={state.dataSource?.State}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default OsState;
