import { Fetch } from '../../../../core/service';
export class MeterSettingsTimeService extends Fetch {
  constructor() {
    super('/meter/settings/time');
  }
  saveData(body: any) {
    return super.save(body);
  }
}