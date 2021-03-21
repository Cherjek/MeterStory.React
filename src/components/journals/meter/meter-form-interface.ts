import { FormInterfaceService } from '../form-interface';
import { DataGridColumnType } from '../../common/data-grid/columns';
import { MeterAnswService } from './meter-answ/meter-answ-service';
const meterService = new MeterAnswService();
export const MeterFormInterface = {
  '/journals/meter/meter-answ-jrnl': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'id',
          name: 'Идентификатор события',
          type: DataGridColumnType.String
        },
        {
          code: 'time',
          name: 'Время',
          type: DataGridColumnType.String
        },
        {
          code: 'idMeter',
          name: 'Идентификатор ПУ',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'type',
            name: 'Тип прибора учета',
            type: DataGridColumnType.Combobox
          },
          ...{ values: meterService.type },
        },
        {
          code: 'addr',
          name: 'Адрес прибора учета',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'iface',
            name: 'Линия интерфейса',
            type: DataGridColumnType.Combobox
          },
          ...{ values: meterService.iface },
        },
        {
          code: 'answer',
          name: 'Признак наличия ответа',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = meterService;
      formInterfaceService.caption = 'Ответы приборов учета';
      return formInterfaceService;
    }
  }
}