import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { NetworkIpSettingsService } from './services/network-ip-settings-service';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class NetworkIpTemplate implements IFormTemplate {
  service = new NetworkIpSettingsService();
  gridColumns = [
    {
      code: 'ip',
      name: 'Address',
      type: DataGridColumnType.String
    },
    {
      code: 'netmask',
      name: 'Netmask',
      type: DataGridColumnType.String
    },
    {
      code: 'gw',
      name: 'Gateway',
      type: DataGridColumnType.String
    },
    {
      code: 'dns1',
      name: 'Primary DNS',
      type: DataGridColumnType.String
    },
    {
      code: 'dns2',
      name: 'Secondary DNS',
      type: DataGridColumnType.String
    },
    {
      code: 'hostname',
      name: 'Hostname',
      type: DataGridColumnType.String
    },
    {
      code: 'dhcp',
      name: 'Разрешение подключения',
      type: DataGridColumnType.Bool
    }
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowAdd: false, isRowDelete: false } };
  headerText = 'Настройки IP';
}
