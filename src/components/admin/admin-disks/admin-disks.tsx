import React from 'react';
import './admin-disks.scss';
import { SidebarMenu } from '../../common/sidebar-menu/sidebar-menu';
import { DataGridColumn, DataGridColumnType } from '../../common/data-grid/columns';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
import DataGrid from '../../common/data-grid/data-grid';
import ButtonAsync from '../../common/button-async/button-async';
import MessagePopup from '../../common/message-popup/message-popup';
import { DiskAccessSettingsService } from './services/disk-access-settings-service';
import { DiskSettings } from './services/models/disk-access-settings';

const initialState = {
  dataSource: null,
  diskNumber: 0
}
const reducer = (state: any, action: any) => { 
  return {...state, ...action };
}
const serviceDisk = new DiskAccessSettingsService();

const AdminDisks = (props: any) => {
  const [state, updateState] = React.useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'Идентификатор',
      type: DataGridColumnType.Int
    },
    {
      code: 'read',
      name: 'Разрешение чтения',
      type: DataGridColumnType.Bool
    },
    {
      code: 'write',
      name: 'Разрешение записи',
      type: DataGridColumnType.Bool
    }
  ];
  const gridSettings = {...new DataGridSettings(), ...{ isRowDelete: false }};
  React.useEffect(() => {
    serviceDisk
      .getData()
      .then(Settings => {
        updateState({ dataSource: Settings });
      }); 
    // const subscription = props.source.subscribe();
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);
  return (    
    <React.Fragment>              
      <div className="main-content">
        <div className="col-3">
          <SidebarMenu />
        </div>
        <div className="col">
          {
            state.handleAppError ? <MessagePopup message={state.handleAppError} close={() => updateState({ handleAppError: null}) } /> : <></>
          }
          <div className="scroll-container">
            <div className="scroll-view">
              <div className="row vertical group-panel">
                <div className="col">
                  <label id="usb">
                    {"Настройки видимости файловой системы по USB".toUpperCase()}
                  </label>
                </div>
                <div className="col">
                  <DataGrid columns={columns} dataSource={state.dataSource} settings={gridSettings} />
                </div>
                <div className="col">
                  <div className="row no-gutters-2 center">
                    <div className="col-auto">
                      <ButtonAsync 
                        className="btn btn-primary"
                        content="Записать"
                        clickAsync={() => serviceDisk.saveData(Object.assign(new DiskSettings(), { Settings: state.dataSource }))}
                        onMessage={(message: any) => updateState({ handleAppError: message}) }                
                      />
                    </div>
                    <div className="col-auto">
                      <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Очистить"
                        clickAsync={() => serviceDisk.clearData().then(() => updateState({ dataSource: null })) }
                        onMessage={(message: any) => updateState({ handleAppError: message}) }                 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row vertical group-panel">
                <div className="col">
                  <label id="diskclear">
                    {"Управление файловой системой (очистка)".toUpperCase()}
                  </label>
                </div>
                <div className="col">
                  <div className="row center">
                    <div className="col-auto">
                      <div className="row no-gutters-2 center">
                        <div className="col">Номер диска</div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="number"
                            value={state.diskNumber}
                            onChange={event => updateState({ diskNumber: event.target.value })}
                          />
                        </div>  
                        <div className="col-auto">
                          <ButtonAsync 
                            className="btn btn-outline-secondary"
                            content="Очистить"
                            clickAsync={() => serviceDisk.diskClear(state.diskNumber)}
                            onMessage={(message: any) => updateState({ handleAppError: message}) }                 
                          />
                        </div>                
                      </div>
                    </div>              
                  </div>
                </div>            
              </div>
            </div>
          </div>         
        
        </div>
      </div>
    </React.Fragment>    
  );
}
export default AdminDisks;