import React, { useReducer, useEffect } from 'react';
import { DataGridSettings } from '../../../../common/data-grid/data-grid-settings';
import DataGrid from '../../../../common/data-grid/data-grid';
import { DataGridColumn, DataGridColumnType } from '../../../../common/data-grid/columns';
import { deviceType } from '../services/meter-arch-settings-service';
const initialState = {
  dataSource: null
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const MeterArchTemplate = (props) => {
  const [state, setDataSource] = useReducer(reducer, initialState);
  const gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: false } };
  const columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    {...{
      code: 'type',
      name: 'Класс устройства',
      type: DataGridColumnType.Combobox
    }, ...{values: deviceType}},
    {
      code: 'size',
      name: 'Максимальное к-во ПУ',
      type: DataGridColumnType.Int
    },
    {
      code: 'free',
      name: 'Доступное к-во ПУ',
      type: DataGridColumnType.Int
    }
  ];
  useEffect(() => {
    setDataSource({ dataSource: props.dataSource });
  }, [props.dataSource]);
  return (
    <DataGrid
      settings={gridSettings}
      columns={columns}
      dataSource={state.dataSource}
    />
  );
};
export default MeterArchTemplate;
