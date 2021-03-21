import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { SchdlTemplateService, schdlEventTypes } from './services/schdl-template-service';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class SchdlTemplate implements IFormTemplate {
  service = new SchdlTemplateService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    {...{
      code: 'type',
      name: 'Тип',
      type: DataGridColumnType.Combobox
    }, ...{values: schdlEventTypes}},
    {
      code: 'day',
      name: 'День',
      type: DataGridColumnType.Int
    },
    {
      code: 'hour',
      name: 'Час',
      type: DataGridColumnType.Int
    },
    {
      code: 'min',
      name: 'Минута',
      type: DataGridColumnType.Int
    },
    {
      code: 'time',
      name: 'Следующее срабатывание',
      type: DataGridColumnType.String
    }
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  headerText = 'Настройки расписаний';
}
