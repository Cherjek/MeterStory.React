import {
  DataGridColumnType,
  DataGridComboboxColumnCallback,
  DataGridComboboxSource
} from '../../../common/data-grid/columns';
import { EventTypeService } from './event-type-service';
import { SmtpServersService } from './smtp-servers-service';
import { AddressService } from './address-service';
import { MqttBrokersService } from './mqtt-brokers-service';

export const typeEvents = ['Расписание','Изменение дискретного входа'];
export const typeTemplates = ['Сообщение оператора','Данные прибора учета','Журналы устройства','Диагностическая информация устройства','Состояние дискретных входов'];

export const TypeEventsColumns: DataGridComboboxColumnCallback[] = [
  Object.assign(new DataGridComboboxColumnCallback(), {...{
    code: 'eventType',
    name: 'Тип события',
    type: DataGridColumnType.Combobox,
    child: 'eventId'
  }, ...{values: ['', ...typeEvents]}}),
  Object.assign(new DataGridComboboxColumnCallback(), {
    code: 'eventId',
    name: 'ID события',
    type: DataGridColumnType.Combobox,
    parent: 'eventType',
    source: new DataGridComboboxSource(new EventTypeService()),
    values: null
  })
];

export const TypeTemplateColumns: DataGridComboboxColumnCallback[] = [
  Object.assign(new DataGridComboboxColumnCallback(), {...{
    code: 'msgType',
    name: 'Тип шаблона сообщения',
    type: DataGridColumnType.Combobox,
    child: 'msgId'
  }, ...{values: ['', ...typeTemplates]}}),
  Object.assign(new DataGridComboboxColumnCallback(), {
    code: 'msgId',
    name: 'ID шаблона сообщения',
    type: DataGridColumnType.Combobox,
    parent: 'msgType',
    source: new DataGridComboboxSource(new EventTypeService()),
    values: null
  })
];

export const SmtpServerColumns: DataGridComboboxColumnCallback[] = [
  Object.assign(new DataGridComboboxColumnCallback(), {
    code: 'srvId',
    name: 'ID почтового сервера',
    type: DataGridColumnType.Combobox,
    source: new DataGridComboboxSource(new SmtpServersService()),
    values: null
  })
];

export const AddressColumns: DataGridComboboxColumnCallback[] = [
  Object.assign(new DataGridComboboxColumnCallback(), {
    code: 'addrId',
    name: 'ID получателя',
    type: DataGridColumnType.Combobox,
    source: new DataGridComboboxSource(new AddressService()),
    values: null
  })
];

export const MqttBrokersColumns: DataGridComboboxColumnCallback[] = [
  Object.assign(new DataGridComboboxColumnCallback(), {
    code: 'srvId',
    name: 'ID брокера',
    type: DataGridColumnType.Combobox,
    source: new DataGridComboboxSource(new MqttBrokersService()),
    values: null
  })
];