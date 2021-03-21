import React, { useState, useReducer, useEffect } from 'react';
import MeterArchTemplate from './meter-arch-template/meter-arch-template';
import MeterArchData from './meter-arch-data/meter-arch-data';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import './meter-arch.scss';
import { MeterArchSettingsService } from './services/meter-arch-settings-service';
import { MeterArchTemplate as MeterArchTemplateObj } from './services/models/meter-arch-template';
const initialState = {
  tab: 1,
};
const initialReducerState = {
  dataSource: null,
  handleMessage: null
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const meterArchSettingsService = new MeterArchSettingsService();
const MeterArchSettings = () => {
  const [state, updateState] = useState(initialState);
  const [stateSource, setDataSource] = useReducer(reducer, initialReducerState);
  useEffect(() => {
    let mounted = true;

    meterArchSettingsService
    .getData()
      .then(
        (
          result: MeterArchTemplateObj[]
        ) => {
          if (mounted) {
            setDataSource({ dataSource: result });
          }
        }
      )
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <React.Fragment>
      <div className="panelBorder">
        <div className="row no-gutters-2 navigate-sidebar-tab">
          <a
            className={'col-auto' + (state.tab === 1 ? ' active' : '')}
            href="javascrip:void(0)"
            onClick={() => updateState({ tab: 1 })}
          >
            Шаблоны
          </a>
          <a
            className={'col-auto' + (state.tab === 2 ? ' active' : '')}
            href="javascrip:void(0)"
            onClick={() => updateState({ tab: 2 })}
          >
            Хранимые данные
          </a>
        </div>
        <hr className="sidebar-hr_margin-block-start" />
      </div>
      {stateSource.handleMessage ? (
        <MessagePopup
          message={stateSource.handleMessage}
          close={() => setDataSource({ handleMessage: null })}
        />
      ) : (
        <></>
      )}
      <div className="scroll-container">
        <div className="scroll-view tab-2">
          <div className="row vertical group-panel">
            <div className="col">
              {state.tab === 1 ? (
                <MeterArchTemplate dataSource={stateSource.dataSource} />
              ) : (
                <MeterArchData dataSource={stateSource.dataSource} />
              )}
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Записать"
                    clickAsync={() =>
                      meterArchSettingsService.saveData(stateSource.dataSource)
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
                      meterArchSettingsService
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
export default MeterArchSettings;
