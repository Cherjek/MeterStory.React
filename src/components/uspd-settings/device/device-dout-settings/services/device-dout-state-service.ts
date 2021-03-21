import { Fetch } from '../../../../../core/service';
import { DeviceDoutSettings } from './models/device-dout-settings';
export const addrDoutState = ['PWR1','PWR2','PWR3','PWR4','PWR5'];
export const stateDouteState = ['Выключено','Включено'];
export class DeviceDoutStateService extends Fetch {
  constructor() {
    super('/state/dout');
  }
  getData = (): Promise<DeviceDoutSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map((sett: DeviceDoutSettings) => {
        sett.addr = addrDoutState[(sett.addr as number)];
        sett.state = stateDouteState[(sett.state as number)];
        return sett;
      }));
  }

  saveData(body: DeviceDoutSettings[]) {
    return super.save(
      {
        State: body.map((sett: DeviceDoutSettings) => {
                      sett = {...sett};
                      sett.addr = addrDoutState.findIndex((v: string) => v === (sett.addr as string));
                      sett.addr = sett.addr === -1 ? 0 : sett.addr;
                      sett.state = stateDouteState.findIndex((v: string) => v === (sett.state as string));
                      sett.state = sett.state === -1 ? 0 : sett.state;
                      return sett;
                  })
    });
  }

  clearData() {
    return super.clear();
  }
}