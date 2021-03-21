import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { NetworkCsdSettings } from './models/network-csd-settings';
import { Fetch } from '../../../../../core/service';
export class NetworkCsdSettingsService extends Fetch implements IFormTemplateService<NetworkCsdSettings> {
  constructor() {
    super('/settings/modem/csd');
  }
  getData(): Promise<NetworkCsdSettings[]> {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings);
  }
  saveData(data: NetworkCsdSettings[]): Promise<Response> {
    return super.save(
      {
        Settings: data
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}