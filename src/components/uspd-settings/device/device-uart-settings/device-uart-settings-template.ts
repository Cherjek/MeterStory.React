import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { DeviceUartSettingsService } from './services/device-uart-settings-service';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class DeviceUartTemplate implements IFormTemplate {
  service = new DeviceUartSettingsService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    {...{
      code: 'line',
      name: 'Линия питания',
      type: DataGridColumnType.Combobox,
      width: 200
    }, ...{values: this.service.line.map(x => x.name) }},
    {...{
      code: 'iface',
      name: 'Интерфейс',
      type: DataGridColumnType.Combobox,
      width: 200
    }, ...{values: this.service.iface.map(x => x.name) }},
    {...{
      code: 'br',
      name: 'Скорость обмена',
      type: DataGridColumnType.Combobox,
      width: 100
    }, ...{values: this.service.br.slice(1).map(x => x.name) }},
    {...{
      code: 'size',
      name: 'Длина кадра',
      type: DataGridColumnType.Combobox,
      width: 80
    }, ...{values: this.service.size.map(x => x.name) }},
    {...{
      code: 'parity',
      name: 'Контроль четности',
      type: DataGridColumnType.Combobox,
      width: 200
    }, ...{values: this.service.parity.map(x => x.name) }},
    {...{
      code: 'stop',
      name: 'Количество стопбит',
      type: DataGridColumnType.Combobox,
      width: 80
    }, ...{values: this.service.stop.map(x => x.name) }},
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  headerText = 'Настройки цифровых интерфейсов';
}
