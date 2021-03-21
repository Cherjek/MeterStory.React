import { Fetch } from '../../../../../core/service';
export class DeviceRestartService extends Fetch {
  constructor() {
    super('/action/restart');
  }
  saveData(): Promise<Response> {
    return super.set([]);
  }
}
