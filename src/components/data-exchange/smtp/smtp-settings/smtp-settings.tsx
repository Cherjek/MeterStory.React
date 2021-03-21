import React from 'react';
import { DataGridColumn, DataGridColumnType } from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import Modal from '../../../common/modal/modal';
import { SmtpSettingsService, smtpAuthport, smtpCport } from './services/smtp-settings-service';
import { SmtpSettings as SmtpSettingsObj } from './services/models/smtp-settings';

const initialState = {
  dataSource: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const smtpSettingsService = new SmtpSettingsService();
const SmtpSettings = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },    
    {
      code: 'addr',
      name: 'Адрес',
      type: DataGridColumnType.String,
      width: 150
    },
    {
      code: 'port',
      name: 'Порт',
      type: DataGridColumnType.Int,
      width: 100
    },
    {
      code: 'login',
      name: 'Логин',
      type: DataGridColumnType.String,
      width: 150
    },
    {
      code: 'password',
      name: 'Пароль',
      type: DataGridColumnType.String,
      width: 150
    },
    {...{
      code: 'auth',
      name: 'Настройки авторизации',
      type: DataGridColumnType.Combobox,
      width: 250
    }, ...{values: smtpAuthport}},
    {...{
      code: 'crypto',
      name: 'Настройки шифрования',
      type: DataGridColumnType.Combobox,
      width: 250
    }, ...{values: smtpCport}},
    {
      code: 'certCheck',
      name: 'Сертификат',
      type: DataGridColumnType.Bool
    },
    {
      code: 'from',
      name: 'Адрес отправителя',
      type: DataGridColumnType.String,
      width: 150
    },
  ];
  const gridSettings = {...new DataGridSettings(), ...{ isRowDelete: false, isHorizontalScroll: true }};
  const onCellEdit = (val) => {
    if (val.col.code === 'certCheck') {
      if (val.row[val.col.code]) {
        setDataSource({ showDialog: true, editRow: val.row });
      }
    }
  }
  React.useEffect(() => {
    let mounted = true;

    smtpSettingsService
    .getData()
      .then(
        (
          result: SmtpSettingsObj[]
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
        <Modal 
            isShown={state.showDialog}
            value={state?.editRow?.cert}
            headerText="Проверочный сертификат"
            onOk={(res) => state.editRow.cert = res }
            onClose={() => setDataSource({ showDialog: null })}
          />
        <div className="scroll-container">
          <div className="scroll-view tab">           

            <div className="row vertical group-panel">
              <div className="col">
                <label>
                  {'Настройка почтового сервера'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid
                  settings={gridSettings}
                  columns={columns}                  
                  dataSource={state.dataSource}
                  onCellEdit={(val) => onCellEdit(val)}
                />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync
                      className="btn btn-primary"
                      content="Записать"
                      clickAsync={() =>
                        smtpSettingsService.saveData(state.dataSource)
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
                      clickAsync={() => smtpSettingsService.clearData().then(() => setDataSource({ dataSource: null })) }
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
}
export default SmtpSettings;