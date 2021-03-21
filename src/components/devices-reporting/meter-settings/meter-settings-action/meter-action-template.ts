import { IFormTemplate } from '../../../shared/form-template/iform-template';
import { MeterActionTemplateService, pollType } from './services/meter-action-template-service';
import { TypeEventsColumns } from '../../../data-exchange/shared/services/data-grid-columns-callback';
import { DataGridColumnType } from '../../../common/data-grid/columns';
import { DataGridSettings } from '../../../common/data-grid/data-grid-settings';

export class MeterActionTemplate implements IFormTemplate {
  service = new MeterActionTemplateService();
  gridColumns = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.Int
    },
    ...TypeEventsColumns,
    {...{
      code: 'type',
      name: 'Тип опроса',
      type: DataGridColumnType.Combobox
    }, ...{values: pollType}}
  ];
  gridSettings = { ...new DataGridSettings(), ...{ isRowDelete: true } };
  headerText = 'Опрос приборов учета по событиям';
}
