import { Fetch } from '../../../../core/service';
import { SntpSettings } from './models/sntp-settings';

export class SntpSettingsService extends Fetch {
  constructor() {
    super('/settings/servers/sntp');
  }
  
  getData = () => {
    return super.get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: SntpSettings) => {
        return sett;
    }));
  }

  saveData(body: SntpSettings[]) {
    return super.save({ Settings: body });
  }

  deleteData(body: SntpSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}