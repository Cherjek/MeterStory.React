import React, { useEffect } from 'react';
import {
  DataGridColumn,
  DataGridColumnType,
} from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { TypeEventsColumns, TypeTemplateColumns, SmtpServerColumns, AddressColumns } from '../../shared/services/data-grid-columns-callback';
import { SmtpActionService } from './services/smtp-action-service';
import { SmtpActionSettings } from './services/models/smtp-action-settings';

const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const smtpActionService = new SmtpActionService();
const SmtpAction = () => {
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
    ...SmtpServerColumns,
    ...AddressColumns
  ]
  useEffect(() => {
    let mounted = true;

    smtpActionService
    .getData()
      .then(
        (
          result: SmtpActionSettings[]
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
              <label>{'Настройка почтового сервера'.toUpperCase()}</label>
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
                      smtpActionService.saveData(state.dataSource)
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
                      smtpActionService
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
export default SmtpAction;
