import { Fetch } from '../../../../core/service';
import { TimeSettings } from './models/time-settings';

export class TimeSettingsService extends Fetch {
  constructor() {
    super('/settings/time/local');
  }
  
  getData = () => {
    return super.get()
      .then((res) => res.json())
      .then((result) => Object.assign(new TimeSettings(), result));
  }

  saveData(body: TimeSettings[]) {
    return super.save(body);
  }

  clearData() {
    return super.clear();
  }
}