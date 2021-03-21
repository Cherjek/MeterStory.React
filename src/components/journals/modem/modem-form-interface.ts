import { FormInterfaceService } from '../form-interface';
import { DataGridColumnType } from '../../common/data-grid/columns';
import { PppClientService, pppResource } from './ppp-client/ppp-client-service';
import { NetworkService, ifaceResource } from './newtwork/network-service';

export const ModemFormInterface = {
  '/journals/modem/ppp-cl-conn-jrn': {
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
          name: 'Время подключения',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'res',
            name: 'Результат',
            type: DataGridColumnType.Combobox
          },
          ...{ values: pppResource },
        }
      ];
      formInterfaceService.service = new PppClientService();
      formInterfaceService.caption = 'Подключения PPP-клиента';
      return formInterfaceService;
    }
  },
  '/journals/modem/srv-conn-jrnl': {
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
          name: 'Время подключения',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'iface',
            name: 'Сетевой интерфейс',
            type: DataGridColumnType.Combobox
          },
          ...{ values: ifaceResource },
        },
        {
          code: 'server',
          name: 'Сервер',
          type: DataGridColumnType.String
        },
        {
          code: 'client',
          name: 'Клиент',
          type: DataGridColumnType.String
        },
      ];
      formInterfaceService.service = new NetworkService();
      formInterfaceService.caption = 'Сетевые подключения';
      return formInterfaceService;
    }
  }
}