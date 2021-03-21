import { DataGridColumn } from '../common/data-grid/columns';
import { MessageExchangeFormInterface } from './message-exchange/message-exchange-interface';
import { DeviceFormInterface } from './device/device-from-interface';
import { ModemFormInterface } from './modem/modem-form-interface';
import { MeterFormInterface } from './meter/meter-form-interface';

export const FormInterface = {
  ...MessageExchangeFormInterface,
  ...DeviceFormInterface,
  ...ModemFormInterface,
  ...MeterFormInterface
}
export interface IFormInterfaceService {
  service: any;
  columns: DataGridColumn[];
  caption: string;
}
export class FormInterfaceService implements IFormInterfaceService {
  service: any;
  columns: DataGridColumn[];
  caption: string;
}