import { FormInterfaceService } from '../form-interface';
import { DataGridColumnType } from '../../common/data-grid/columns';
import { DinJrnlService, dinJrnlSens, dinJrnlState } from './din-jrnl/din-jrnl-service';
import { AuthJrnlService, levelAuth } from './auth/auth-jrnl-service';
import { TimeJrnlService, sourceTime } from './time/time-jrnl-service';
const columnsDinJrnl = [
  {
    code: 'id',
    name: 'Идентификатор события',
    type: DataGridColumnType.String
  },
  {
    code: 'time',
    name: 'Время изменения',
    type: DataGridColumnType.String
  },
  {
    ...{
      code: 'sens',
      name: 'Дискретный вход',
      type: DataGridColumnType.Combobox
    },
    ...{ values: dinJrnlSens },
  },
  {
    ...{
      code: 'state',
      name: 'Установленное состояние',
      type: DataGridColumnType.Combobox
    },
    ...{ values: dinJrnlState },
  }
];
export const DeviceFormInterface = {
  '/journals/device/din-jrnl-sense': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = columnsDinJrnl;
      formInterfaceService.service = new DinJrnlService('/jrnl/din/sens');
      formInterfaceService.caption = 'Изменения состояния дискретных входов';
      return formInterfaceService;
    }
  },
  '/journals/device/din-jrnl-pwrline': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = columnsDinJrnl;
      formInterfaceService.service = new DinJrnlService('/jrnl/din/pwrline');
      formInterfaceService.caption = 'Перегрузки линий питания интерфейсов';
      return formInterfaceService;
    }
  },
  '/journals/device/din-jrnl-power': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = columnsDinJrnl;
      formInterfaceService.service = new DinJrnlService('/jrnl/din/power');
      formInterfaceService.caption = 'Изменения состояния питания устройства';
      return formInterfaceService;
    }
  },
  '/journals/device/din-jrnl-charge': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = columnsDinJrnl;
      formInterfaceService.service = new DinJrnlService('/jrnl/din/charge');
      formInterfaceService.caption = 'Зарядки аккумуляторной батареи';
      return formInterfaceService;
    }
  },
  '/journals/device/din-jrnl-open': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = columnsDinJrnl;
      formInterfaceService.service = new DinJrnlService('/jrnl/din/open');
      formInterfaceService.caption = 'Вскрытия корпуса';
      return formInterfaceService;
    }
  },
  '/journals/device/auth-jrnl': {
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
          name: 'Время авторизации',
          type: DataGridColumnType.String
        },
        {
          code: 'login',
          name: 'Логин(первые 16 символов)',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'lvl',
            name: 'Уровень полученного доступа',
            type: DataGridColumnType.Combobox
          },
          ...{ values: levelAuth },
        }
      ];
      formInterfaceService.service = new AuthJrnlService();
      formInterfaceService.caption = 'Авторизация';
      return formInterfaceService;
    }
  },
  '/journals/device/time-jrnl': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'id',
          name: 'Идентификатор события',
          type: DataGridColumnType.String
        },
        {
          code: 'oldTime',
          name: 'Время до установки',
          type: DataGridColumnType.String
        },
        {
          code: 'newTime',
          name: 'Время после установки',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'source',
            name: 'Причина изменения времени',
            type: DataGridColumnType.Combobox
          },
          ...{ values: sourceTime },
        }
      ];
      formInterfaceService.service = new TimeJrnlService();
      formInterfaceService.caption = 'Установка времени';
      return formInterfaceService;
    }
  }
}