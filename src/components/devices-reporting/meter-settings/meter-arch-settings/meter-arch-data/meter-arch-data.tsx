import React, { useReducer, useEffect } from 'react';
import { DataGridSettings } from '../../../../common/data-grid/data-grid-settings';
import DataGrid from '../../../../common/data-grid/data-grid';
import {
  DataGridColumn,
  DataGridColumnType,
} from '../../../../common/data-grid/columns';
import { _storageType } from '../services/meter-arch-settings-service';
import { MeterArchTemplate } from '../services/models/meter-arch-template';
import { MeterArchStorage } from '../services/models/meter-arch-storage';
import ComboBox from '../../../../common/combo-box/combo-box';
const initialState = {
  dataSource: null,
  loading: false,
  comboSource: null,
  template: null
};
const reducer = (state: any, action: any) => {
  if (action.type === 'INIT') {
    const result = {
      comboSource: (action.dataSource as MeterArchTemplate[]).map((x) => {
        x['name'] = `id: ${x.id}, тип: ${x.type}`;
        return x;
      }),
      template: null,
    };
    const sources = result.comboSource?.map((x) => x);
    if (sources && sources.length) {
      result.template = sources[0];
    }
    action = { ...result, ...action };
  }
  // const template = action.template || state.template;
  // if (template) {
  //   action.gridSource = ((action.dataSource || state.dataSource) as MeterArchTemplate[])?.find(
  //     (x) => x.id === template.id
  //   )?.Storages;
  // }
  return { ...state, ...action };
};
const MeterArchData = (props) => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: false } };
  const columns: DataGridColumn[] = [
    {
      ...{
        code: 'type',
        name: 'Тип',
        type: DataGridColumnType.Combobox,
      },
      ...{ values: _storageType.map((x) => x[0]) },
    },
    {
      code: 'depth',
      name: 'Глубина',
      type: DataGridColumnType.Int,
    },
  ];
  useEffect(() => {
    if (!state.loading) setDataSource({ type: 'INIT', dataSource: props.dataSource });
    if (state.loading) setTimeout(() => setDataSource({ loading: false}), 1000);
  }, [props.dataSource, state.loading]);
  return (
    <React.Fragment>
      <div className="row vertical">
        <div className="col">
          <ComboBox
            uniqueId="template"
            valueField="name"
            dataSource={state.comboSource}
            onSelected={(val) => setDataSource({ loading: true, template: val })}
          />
        </div>
        <div className="col">
          {state.loading ? 'Загрузка...' :
          <DataGrid
            settings={gridSettings}
            columns={columns}
            dataSource={state?.template?.Storages}
          />
          }
        </div>
      </div>
    </React.Fragment>
  );
};
export default MeterArchData;
