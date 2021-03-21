import React, { useEffect } from 'react';

import { SystemInfo } from './services/models/system-info';
import { SystemInfoService } from './services/system-info.service';
import './system-info.scss';

interface IStateData {
  dataSource: SystemInfo;
}

const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const systemInfoService = new SystemInfoService();
const SysInfo = () => {
  const [state, setDataSource]: [IStateData, any] = React.useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    let mounted = true;

    systemInfoService
      .getData()
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
      <div className="scroll-container">
        <div className="scroll-view">
          <div className="row vertical group-panel">
            <div className="col sys-info-heading">
              <label className="sys-info-heading_text">
                КОНФИГУРАЦИЯ СИСТЕМЫ
              </label>
            </div>
            <div className="col">
              <div className="sys-info">
                <span className="sys-info-title">Версия ВПО:</span>
                <span>{' ' + state.dataSource?.fw}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Версия загрузчика:</span>
                <span>{' ' + state.dataSource?.bl}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Версия платы:</span>
                <span>{' ' + state.dataSource?.REV}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Модем:</span>
                <span>{' ' + state.dataSource?.MODEM}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Батарея:</span>
                <span>{' ' + state.dataSource?.BAT}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">MAC-адрес:</span>
                <span>{' ' + state.dataSource?.MAC}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Серийный номер:</span>
                <span>{' ' + state.dataSource?.SN}</span>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Тип питания:</span>
                <span>{' ' + state.dataSource?.MAIN_PWR}</span>
              </div>
              <div className="sys-info sys-info-list">
                <span className="sys-info-title">Память:</span>
                <ul className="sys-info-list-items">
                  {state.dataSource?.DF.map((x) => (
                    <li key={x.NUM}>{x.TYPE}</li>
                  ))}
                </ul>
              </div>
              <div className="sys-info sys-info-list">
                <span className="sys-info-title">Интерфейсы:</span>
                <ul className="sys-info-list-items">
                  {state.dataSource?.IF.map((x) => (
                    <li key={x.NUM}>{x.TYPE}</li>
                  ))}
                </ul>
              </div>
              <div className="sys-info">
                <span className="sys-info-title">Дата выпуска:</span>
                <span>{' ' + state.dataSource?.DATE}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SysInfo;
