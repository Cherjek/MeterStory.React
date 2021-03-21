import React, { useEffect, useReducer } from 'react';
import { SidebarMenu } from '../../../common/sidebar-menu/sidebar-menu';
import { DataGridColumn, DataGridColumnType } from '../../../common/data-grid/columns';
import DataGrid from '../../../common/data-grid/data-grid';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import { DeviceDoutSettingsService, addrDeviceDout, stateDeviceDout } from './services/device-dout-settings-service';
import { DeviceDoutStateService } from './services/device-dout-state-service';
import { DeviceDoutSettings as DeviceDoutSettingsObj } from './services/models/device-dout-settings';
const initialState = {
  dataSource: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const deviceDoutSettingsService = new DeviceDoutSettingsService();
const deviceDoutStateService = new DeviceDoutStateService();
const DeviceDoutSettings = () => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    {...{
      code: 'addr',
      name: 'Линия питания',
      type: DataGridColumnType.Combobox,
      width: 250
    }, ...{values: addrDeviceDout}},
    {...{
      code: 'state',
      name: 'Текущее состояние',
      type: DataGridColumnType.Combobox,
      width: 250
    }, ...{values: stateDeviceDout}}
  ];
  const gridSettings = {...new DataGridSettings(), ...{ isRowDelete: false, isHorizontalScroll: false }};
  const columns2: DataGridColumn[] = [
    {
      code: 'addr',
      name: 'Линия питания',
      type: DataGridColumnType.String
    },
    {
      code: 'state',
      name: 'Текущее состояние',
      type: DataGridColumnType.String
    }
  ];
  const gridSettings2 = {...new DataGridSettings(), ...{ readOnly: true }};
  useEffect(() => {
    let mounted = true;

    Promise.all([
      deviceDoutSettingsService.getData(),
      deviceDoutStateService.getData()
    ])
    .then(
      (result: [DeviceDoutSettingsObj[], DeviceDoutSettingsObj[]]) => {
        if (mounted) {
          setDataSource({ sourceSettings: result[0], sourceState: result[1] });
        }
      }
    )

    return () => {
      mounted = false;
    }
  }, []);
  return (
    <div className="row no-gutters-2">
      <div className="col-3">
        <SidebarMenu items={[{ url: '#dout-settings', name: 'Настройки линий питания' },{ url: '#dout-state', name: 'Состояние линий питания' }]} />
      </div>
      <div className="col">
        {
          state.handleMessage ? <MessagePopup message={state.handleMessage} close={() => setDataSource({ handleMessage: null})} /> : <></>
        }
        <div className="scroll-container">
          <div className="scroll-view tab">
            <div className="row vertical group-panel">
              <div className="col">
                <label id="dout-settings">
                  {'Настройки линий питания'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid columns={columns} dataSource={state.sourceSettings} settings={gridSettings} />
              </div>
              <div className="col">
                <div className="row no-gutters-2 center">
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-primary"
                        content="Записать"
                        clickAsync={() => deviceDoutSettingsService.saveData(state.sourceSettings)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                    />
                  </div>
                  <div className="col-auto">
                    <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Очистить"
                        clickAsync={() => deviceDoutSettingsService.clearData().then(() => setDataSource({ sourceSettings: null })) }
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                  
                      />
                  </div>
                </div>
              </div>
            </div>

            <div className="row vertical group-panel">
              <div className="col">
                <label id="dout-state">
                  {'Состояние линий питания'.toUpperCase()}
                </label>
              </div>
              <div className="col">
                <DataGrid columns={columns2} settings={gridSettings2} dataSource={state.sourceState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeviceDoutSettings;