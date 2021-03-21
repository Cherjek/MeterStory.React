import React from 'react';
import './admin-servers.scss';
import { SidebarMenu } from '../../common/sidebar-menu/sidebar-menu';
import { DataGridColumn, DataGridColumnType } from '../../common/data-grid/columns';
import DataGrid from '../../common/data-grid/data-grid';
import { AuthSettingsService, level } from './services/auth-settings-service';
import { RtuProtoAuthSettingsService } from './services/rtu-proto-auth-settings-service';
import { TextProtoAuthSettingsService, level as levelText } from './services/text-proto-auth-settings-service';
import { AuthSettings } from './services/models/auth-settings';
import { RtuProtoAuthSettings } from './services/models/rtu-proto-auth-settings';
import { TextProtoAuthSettings } from './services/models/text-proto-auth-settings';
import ButtonAsync from '../../common/button-async/button-async';
import MessagePopup from '../../common/message-popup/message-popup';

const initialState = {
  sourceAuth: null,
  sourceRtu: null,
  sourceText: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const serviceAuth = new AuthSettingsService();
const serviceRtu = new RtuProtoAuthSettingsService();
const serviceText = new TextProtoAuthSettingsService();

const AdminServers = (props: any) => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'Идентификатор',
      type: DataGridColumnType.Int
    },
    {
      code: 'login',
      name: 'Логин',
      type: DataGridColumnType.String
    },
    {
      code: 'password',
      name: 'Пароль',
      type: DataGridColumnType.String
    },
    {...{
      code: 'lvl',
      name: 'Уровень доступа',
      type: DataGridColumnType.Combobox,
      
    }, ...{values: level}}
  ];
  const columns1: DataGridColumn[] = [
    {
      code: 'id',
      name: 'Идентификатор',
      type: DataGridColumnType.Int
    },
    {
      code: 'password',
      name: 'Пароль',
      type: DataGridColumnType.String
    }
  ];
  const columns2: DataGridColumn[] = [
    {
      code: 'id',
      name: 'Идентификатор',
      type: DataGridColumnType.Int
    },    
    {
      code: 'password',
      name: 'Пароль',
      type: DataGridColumnType.String
    },
    {...{
      code: 'lvl',
      name: 'Уровень доступа',
      type: DataGridColumnType.Combobox,
      
    }, ...{values: levelText}}
  ];
  const onDeleteAuth = (val: any) => {
    serviceAuth
      .deleteData(val);
  }
  const onDeleteRtu = (val: any) => {
    serviceRtu
      .deleteData(val);
  }
  const onDeleteText = (val: any) => {
    serviceText
      .deleteData(val);
  };
  React.useEffect(() => {
    let mounted = true;

    Promise.all([
      serviceAuth.getData(),
      serviceRtu.getData(),
      serviceText.getData(),
    ])
      .then(
        (
          result: [
            AuthSettings[],
            RtuProtoAuthSettings[],
            TextProtoAuthSettings[]
          ]
        ) => {
          const BigDataSource = {
            sourceAuth: result[0],
            sourceRtu: result[1],
            sourceText: result[2],
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
        {
          state.handleMessage ? <MessagePopup message={state.handleMessage} close={() => setDataSource({ handleMessage: null})} /> : <></>
        }
        <div className="scroll-container">
          <div className="scroll-view">
            <div className="row vertical group-panel">
              <div className="col">
                <label id="httpserver">
                  {'Администрирование HTTP-сервера'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid columns={columns} dataSource={state.sourceAuth} onDelete={(val : any) => onDeleteAuth(val)} />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-primary"
                        content="Записать"
                        clickAsync={() => serviceAuth.saveData(state.sourceAuth)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Очистить"
                        clickAsync={() => serviceAuth.clearData().then(() => setDataSource({ sourceAuth: null })) }
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                  
                      />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="rtu327">
                  {'Администрирование сервера RTU327'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid columns={columns1} dataSource={state.sourceRtu} onDelete={(val : any) => onDeleteRtu(val)} />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-primary"
                        content="Записать"
                        clickAsync={() => serviceRtu.saveData(state.sourceRtu)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Очистить"
                        clickAsync={() => serviceRtu.clearData().then(() => setDataSource({ sourceRtu: null })) }
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                  
                      />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="textprotocol">
                  {'Администрирование сервера текстового протокола'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid columns={columns2} dataSource={state.sourceText} onDelete={(val : any) => onDeleteText(val)} />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-primary"
                        content="Записать"
                        clickAsync={() => serviceText.saveData(state.sourceText)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Очистить"
                        clickAsync={() => serviceText.clearData().then(() => setDataSource({ sourceText: null })) }
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                  
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
};

export default AdminServers;