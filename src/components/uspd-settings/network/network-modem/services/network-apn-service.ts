import { Fetch } from '../../../../../core/service';
import { NetworkApn } from './models/network-apn';
export class NetworkApnService extends Fetch {
  constructor() {
    super('/settings/modem/apn');
  }
  getData(): Promise<NetworkApn[]> {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings);
  }
  saveData(data: NetworkApn[]): Promise<Response> {
    return super.save(
      {
        Settings: data
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}