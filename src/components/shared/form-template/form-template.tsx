import React, { useEffect } from 'react';
import { IFormTemplate } from './iform-template';
import { DataGridColumn } from '../../common/data-grid/columns';
import DataGrid from '../../common/data-grid/data-grid';
import ButtonAsync from '../../common/button-async/button-async';
import MessagePopup from '../../common/message-popup/message-popup';

const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const FormTemplate = (props) => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const iformTemplate: IFormTemplate = props.iformTemplate;
  const gridSettings = iformTemplate.gridSettings;
  const columns: DataGridColumn[] = iformTemplate.gridColumns;
  const service = iformTemplate.service;
  useEffect(() => {
    let mounted = true;

    service
      .getData()
        .then(
          (
            result: any[]
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
  }, [service]);
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
        <div className={'scroll-view' + (props.scrollViewTab === 1 ? ' tab' : props.scrollViewTab === 2 ? ' tab-2' : '')}>
          <div className="row vertical group-panel">
            <div className="col">
              <label>{iformTemplate.headerText.toUpperCase()}</label>
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
                      iformTemplate.service.saveData(state.dataSource)
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
                      iformTemplate.service
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
export default FormTemplate;