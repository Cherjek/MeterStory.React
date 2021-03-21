import { Fetch } from '../../../../core/service';
import { RtuProtoAuthSettings } from './models/rtu-proto-auth-settings';

export class RtuProtoAuthSettingsService extends Fetch {
  constructor() {
    super('/settings/proto/rtu/auth');
  }

  getData = () => {
    return super.get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: RtuProtoAuthSettings) => {
        return sett;
    }));
  }

  saveData(body: RtuProtoAuthSettings[]) {
    return super.save({ Settings: body });
  }

  deleteData(body: RtuProtoAuthSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}