import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { NetworkIpSettings } from './models/network-ip-settings';
import { Fetch } from '../../../../../core/service';
import { EventTypeService } from '../../../../data-exchange/shared/services/event-type-service';
export class NetworkIpSettingsService extends Fetch implements IFormTemplateService<NetworkIpSettings> {
  eventTypeService = new EventTypeService();
  constructor() {
    super('/settings/ip');
  }
  getData(): Promise<NetworkIpSettings[]> {
    return super
      .get()
      .then((res) => res.json())
      .then((ip) => [ip]);
  }
  saveData(data: any | NetworkIpSettings[]): Promise<Response> {
    if (data && data.length) {
      data = data[0];
    }
    if (!data) {
      return new Promise<Response>((res, rej) => {
        res();
      });
    }
    return super.save(data);
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}