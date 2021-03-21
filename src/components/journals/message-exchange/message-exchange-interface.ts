import { DataGridColumnType } from '../../common/data-grid/columns';
import { FormInterfaceService } from '../form-interface';
import { MessageExchangeSmtpService, resValues as resValuesSmtp } from './smtp/services/message-exchange-smtp-service';
import { MessageExchangeStorageService, actionValues, resValues as resValuesStorage } from './storage/services/message-exchange-storage-service';
import { MessageExchangeMqttService, resValues as resValuesMqtt } from './mqtt/services/message-exchange-mqtt-service';
import { MessageExchangeMqttMessagesService, statusMqttMessages } from './mqtt-messages/services/message-exchange-mqtt-messages-service';

export const MessageExchangeFormInterface = {
  '/journals/message-exchange/smtp': {
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
          name: 'Время изменения',
          type: DataGridColumnType.String
        },
        {
          code: 'idMsg',
          name: 'Идентификатор сообщения',
          type: DataGridColumnType.String
        },
        {
          code: 'idSrv',
          name: 'Идентификатор почтового сервера',
          type: DataGridColumnType.String
        }, 
        {
          code: 'idTo',
          name: 'Идентификатор адресата',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'res',
            name: 'Результат отправки',
            type: DataGridColumnType.Combobox
          },
          ...{ values: resValuesSmtp },
        }
      ];
      formInterfaceService.service = new MessageExchangeSmtpService();
      formInterfaceService.caption = 'Почтовые сообщения';
      return formInterfaceService;
    }
  },
  '/journals/message-exchange/smtp-storage': {
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
          name: 'Время изменения',
          type: DataGridColumnType.String
        },
        {
          code: 'idMsg',
          name: 'Идентификатор сообщения',
          type: DataGridColumnType.String
        },
        {
          code: 'idSrv',
          name: 'Идентификатор почтового сервера',
          type: DataGridColumnType.String
        }, 
        {
          code: 'idTo',
          name: 'Идентификатор адресата',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'action',
            name: 'Выполненная операция',
            type: DataGridColumnType.Combobox
          },
          ...{ values: actionValues },
        },
        {
          ...{
            code: 'res',
            name: 'Результат операции',
            type: DataGridColumnType.Combobox
          },
          ...{ values: resValuesStorage },
        }
      ];
      formInterfaceService.service = new MessageExchangeStorageService();
      formInterfaceService.caption = 'Хранилище почтовых сообщений';
      return formInterfaceService;
    }
  },
  '/journals/message-exchange/mqtt': {
    init: () => {
      const formInterfaceService = new FormInterfaceService();
      formInterfaceService.columns = [
        {
          code: 'id',
          name: 'Идентификатор события',
          type: DataGridColumnType.String
        },
        {
          code: 'connect',
          name: 'Время подключения',
          type: DataGridColumnType.String
        },
        {
          code: 'disconnect',
          name: 'Время отключения',
          type: DataGridColumnType.String
        },
        {
          code: 'address',
          name: 'Адрес',
          type: DataGridColumnType.String
        }, 
        {
          code: 'port',
          name: 'Порт',
          type: DataGridColumnType.String
        },
        {
          ...{
            code: 'res',
            name: 'Результат подключения',
            type: DataGridColumnType.Combobox
          },
          ...{ values: resValuesMqtt },
        }
      ];
      formInterfaceService.service = new MessageExchangeMqttService();
      formInterfaceService.caption = 'Подключения к MQTT-брокеру';
      return formInterfaceService;
    }
  },
  '/journals/message-exchange/mqtt-messages': {
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
          ...{
            code: 'status',
            name: 'Действие',
            type: DataGridColumnType.Combobox
          },
          ...{ values: statusMqttMessages },
        },
        {
          code: 'topicH',
          name: 'Имя топика(начало)',
          type: DataGridColumnType.String
        },
        {
          code: 'topicL',
          name: 'Имя топика(окончание)',
          type: DataGridColumnType.String
        }, 
        {
          code: 'file',
          name: 'Имя файла',
          type: DataGridColumnType.String
        }
      ];
      formInterfaceService.service = new MessageExchangeMqttMessagesService();
      formInterfaceService.caption = 'MQTT сообщения';
      return formInterfaceService;
    }
  },
  '/journals/message-exchange/mqtt-storage': {

  }
}