import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { NetworkCsdSettingsService } from './services/network-csd-settings-service';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class NetworkCsdTemplate implements IFormTemplate {
  service = new NetworkCsdSettingsService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    {
      code: 'server',
      name: 'Адрес сервера',
      type: DataGridColumnType.String
    },
    {
      code: 'peer',
      name: 'Адрес клиента',
      type: DataGridColumnType.String
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
    {
      code: 'enable',
      name: 'Разрешение подключения',
      type: DataGridColumnType.Bool
    },
    // {...{
    //   code: 'type',
    //   name: 'Тип опроса',
    //   type: DataGridColumnType.Combobox
    // }, ...{values: pollType}}
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: false } };
  headerText = 'PPP-сервер';
}
