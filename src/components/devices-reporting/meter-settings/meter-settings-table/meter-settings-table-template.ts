import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { MeterSettingsTableService } from './services/meter-settings-table-service';
import { DataGridColumnType, DataGridComboboxColumnCallback } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class MeterSettingsTableTemplate implements IFormTemplate {
  service = new MeterSettingsTableService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int,
      width: 100
    },
    {
      code: 'pId',
      name: 'ID родительского устройства',
      type: DataGridColumnType.Int
    },
    {
      code: 'archId',
      name: 'ID шаблона хранения данных',
      type: DataGridColumnType.Int
    },
    {...{
      code: 'type',
      name: 'Тип прибора учета',
      type: DataGridColumnType.Combobox,
      width: 200
    }, ...{values: this.service.type.map(x => x.name) }},
    {
      code: 'addr',
      name: 'Адрес',
      type: DataGridColumnType.String,
      width: 200
    },
    Object.assign(new DataGridComboboxColumnCallback(), {
      code: 'passType',
      name: 'Формат пароля',
      type: DataGridColumnType.Combobox,
      values: this.service.passType.map(x => x.name),
      width: 150,
      child: ['passRd', 'passWr'],
      defVal: 'RAW'
    }),
    {
      code: 'passRd',
      name: 'Пароль первого уровня',
      type: DataGridColumnType.String,
      inputRules: [
        { fieldDependOn: 'passType', valDependOn: ['RAW','HEX'], ruleRegex: /^[a-fA-F0-9]*$/ }
      ],
      width: 200
    },
    {
      code: 'passWr',
      name: 'Пароль второго уровня',
      type: DataGridColumnType.String,
      inputRules: [
        { fieldDependOn: 'passType', valDependOn: ['RAW','HEX'], ruleRegex: /^[a-fA-F0-9]*$/ }
      ],
      width: 200
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
      width: 100,
      defVal: 'Автоматически'
    }, ...{values: this.service.br.map(x => x.name) }},
    {...{
      code: 'size',
      name: 'Длина кадра',
      type: DataGridColumnType.Combobox,
      disabledRules: { field: 'br', val: 'Автоматически' },
      width: 80
    }, ...{values: this.service.size.map(x => x.name) }},
    {...{
      code: 'parity',
      name: 'Контроль четности',
      type: DataGridColumnType.Combobox,
      disabledRules: { field: 'br', val: 'Автоматически' },
      width: 200
    }, ...{values: this.service.parity.map(x => x.name) }},
    {...{
      code: 'stop',
      name: 'Количество стопбит',
      type: DataGridColumnType.Combobox,
      disabledRules: { field: 'br', val: 'Автоматически' },
      width: 80
    }, ...{values: this.service.stop.map(x => x.name) }},
    {
      code: 'rtuObjType',
      name: 'Тип объекта RTU',
      type: DataGridColumnType.String
    },
    {
      code: 'rtuObjNum',
      name: 'Номер объекта RTU',
      type: DataGridColumnType.String
    },
    {
      code: 'rtuFider',
      name: 'Номер фидера RTU',
      type: DataGridColumnType.String
    }
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: false, isHorizontalScroll: true } };
  headerText = 'Таблица приборов учета';
}
