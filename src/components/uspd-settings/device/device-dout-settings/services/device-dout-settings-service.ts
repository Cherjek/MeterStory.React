import { Fetch } from '../../../../../core/service';
import { DeviceDoutSettings } from './models/device-dout-settings';
export const addrDeviceDout = ['PWR1','PWR2','PWR3','PWR4','PWR5'];
export const stateDeviceDout = ['Автоматически','Включено','Выключено'];
export class DeviceDoutSettingsService extends Fetch {
  constructor() {
    super('/settings/dout');
  }
  getData = (): Promise<DeviceDoutSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: DeviceDoutSettings) => {
        sett.addr = addrDeviceDout[(sett.addr as number)];
        sett.state = stateDeviceDout[(sett.state as number)];
        return sett;
      }));
  }

  saveData(body: DeviceDoutSettings[]) {
    return super.save(
      {
        Settings: body.map((sett: DeviceDoutSettings) => {
                      sett = {...sett};
                      sett.addr = addrDeviceDout.findIndex((v: string) => v === (sett.addr as string));
                      sett.addr = sett.addr === -1 ? 0 : sett.addr;
                      sett.state = stateDeviceDout.findIndex((v: string) => v === (sett.state as string));
                      sett.state = sett.state === -1 ? 0 : sett.state;
                      return sett;
                  })
    });
  }

  deleteData(body: DeviceDoutSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}