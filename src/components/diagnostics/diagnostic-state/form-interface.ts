import { DataGridColumn, DataGridColumnType } from '../../common/data-grid/columns';

import { DinStateService, addrValues, stateValues } from './services/din-state-service';
import { AinStateService, addrAinValues } from './services/ain-state-service';
import { DoutStateService, addrValues as addrDoutValues, stateValues as stateDoutValues } from './services/dout-state-service';
import { DataFlashStateService } from './services/dataflash-state-service';
import { SystemStateService, states as systemStates } from './services/system-state-service';
import { UartStateService } from './services/uart-state-service';
import { ModemStateService } from './services/modem-state-service';

export const FormInterface = {
  '/diagnostics/din-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          ...{
            code: 'addr',
            name: 'Дискретный вход',
            type: DataGridColumnType.Combobox
          },
          ...{ values: addrValues },
        },
        {
          ...{
            code: 'state',
            name: 'Состояние',
            type: DataGridColumnType.Combobox
          },
          ...{ values: stateValues },
        }
      ];
      formInterfaceService.service = new DinStateService();
      formInterfaceService.caption = 'Состояние дискретных входов';
      return formInterfaceService;
    }
  },
  '/diagnostics/anal-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          ...{
            code: 'addr',
            name: 'Аналоговый вход',
            type: DataGridColumnType.Combobox
          },
          ...{ values: addrAinValues },
        },
        {
          code: 'state',
          name: 'Состояние',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new AinStateService();
      formInterfaceService.caption = 'Состояние аналоговых входов';
      return formInterfaceService;
    }
  },
  '/diagnostics/line-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          ...{
            code: 'addr',
            name: 'Линия питания',
            type: DataGridColumnType.Combobox
          },
          ...{ values: addrDoutValues },
        },
        {
          ...{
            code: 'state',
            name: 'Состояние',
            type: DataGridColumnType.Combobox
          },
          ...{ values: stateDoutValues },
        }
      ];
      formInterfaceService.service = new DoutStateService();
      formInterfaceService.caption = 'Состояние линейных входов';
      return formInterfaceService;
    }
  },
  '/diagnostics/dataflash-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'id',
          name: 'Идентификатор микросхемы',
          type: DataGridColumnType.String
        },
        {
          code: 'sectors',
          name: 'Размер(сектора)',
          type: DataGridColumnType.String
        },
        {
          code: 'size',
          name: 'Размер сектора(байты)',
          type: DataGridColumnType.String
        },
        {
          code: 'type',
          name: 'Тип микросхемы',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new DataFlashStateService();
      formInterfaceService.caption = 'Информация о микросхемах Dataflash';
      return formInterfaceService;
    }
  },
  '/diagnostics/file-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'num',
          name: 'Номер',
          type: DataGridColumnType.String
        },
        {
          code: 'info',
          name: 'Имя',
          type: DataGridColumnType.String
        },
        {
          code: 'size',
          name: 'Размер(сектора)',
          type: DataGridColumnType.String
        },
        {
          code: 'free',
          name: 'Свободно(сектора)',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new DataFlashStateService('/state/file_system');
      formInterfaceService.caption = 'Информация о дисках';
      return formInterfaceService;
    }
  },
  '/diagnostics/system-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'id',
          name: 'Идентификатор процесса',
          type: DataGridColumnType.String
        },
        {
          code: 'name',
          name: 'Имя',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'state',
            name: 'Состояние',
            type: DataGridColumnType.Combobox
          },
          ...{ values: systemStates },
        },
        {
          code: 'priority',
          name: 'Приоритет',
          type: DataGridColumnType.String
        },
        {
          code: 'stacksize',
          name: 'Выделено памяти(stack)',
          type: DataGridColumnType.String
        },
        {
          code: 'stackfree',
          name: 'Свободно памяти(stack)',
          type: DataGridColumnType.String
        },
        {
          code: 'stackmin',
          name: 'Минимальное количество свободной памяти(stack)',
          type: DataGridColumnType.String
        },
        {
          code: 'runtime',
          name: 'Время работы',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new SystemStateService();
      formInterfaceService.caption = 'Менеджер процессов';
      return formInterfaceService;
    }
  },
  '/diagnostics/network-state': {

  },
  '/diagnostics/modem-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'property',
          name: 'Свойство',
          type: DataGridColumnType.String
        },
        {
          code: 'value',
          name: 'Значение',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new ModemStateService();
      formInterfaceService.caption = 'Информация о модеме';
      return formInterfaceService;
    }
  },
  '/diagnostics/number-state': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'iface',
          name: 'Порт',
          type: DataGridColumnType.String
        },
        {
          code: 'lock',
          name: 'Состояние',
          type: DataGridColumnType.String
        },
        {
          code: 'task',
          name: 'Имя процесса',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new UartStateService();
      formInterfaceService.caption = 'Информация о последовательных портах';
      return formInterfaceService;
    }
  },
  '/diagnostics/clock-state': {

  },
};
export interface IFormInterfaceService {
  service: any;
  columns: DataGridColumn[];
  caption: string;
}
class FormInterfaceService implements IFormInterfaceService {
  service: any;
  columns: DataGridColumn[];
  caption: string;
}