import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { DeviceDinSettings } from './models/device-din-settings';
import { Fetch } from '../../../../../core/service';
export const addrDeviceDin = ['Дискретный вход 1','Дискретный вход 2','Дискретный вход 3','Дискретный вход 4','Перегрузка линий питания интерфейсов', 'Наличие основного питания(220В)', 'Наличие резервного питания(12В)','Наличие питания от аккумуляторной батареи(3.8В)', 'Заряд аккумуляторной батареи','Кнопка К1','Датчик вскрытия корпуса'];
export const stateDeviceDin = ['Замкнут','Разомкнут'];
export class DeviceDinSettingsService extends Fetch implements IFormTemplateService<DeviceDinSettings> {
  constructor() {
    super('/settings/din');
  }
  getData(): Promise<DeviceDinSettings[]> {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: DeviceDinSettings) => {
        sett.addr = addrDeviceDin[(sett.addr as number)];
        sett.state = stateDeviceDin[(sett.state as number)];
        return sett;
      }));
  }
  saveData(body: DeviceDinSettings[]): Promise<Response> {
    return super.save(
      {
        Settings: body.map((sett: DeviceDinSettings) => {
                      sett = {...sett};
                      sett.addr = addrDeviceDin.findIndex((v: string) => v === (sett.addr as string));
                      sett.addr = sett.addr === -1 ? 0 : sett.addr;
                      sett.state = stateDeviceDin.findIndex((v: string) => v === (sett.state as string));
                      sett.state = sett.state === -1 ? 0 : sett.state;
                      if (sett.filter != null) {
                        sett.filter = Number(sett.filter);
                      }
                      return sett;
                  })
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}