import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { DeviceDinSettingsService, addrDeviceDin, stateDeviceDin } from './services/device-din-settings-service';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class DeviceDinTemplate implements IFormTemplate {
  service = new DeviceDinSettingsService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    {...{
      code: 'addr',
      name: 'Дискретный вход',
      type: DataGridColumnType.Combobox
    }, ...{values: addrDeviceDin }},
    {
      code: 'filter',
      name: 'Время установки состояния(мс)',
      type: DataGridColumnType.Int
    },
    {...{
      code: 'state',
      name: 'Начальное состояние',
      type: DataGridColumnType.Combobox,
      width: 200
    }, ...{values: stateDeviceDin }},
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  headerText = 'Настройки дискретных входов';
}
