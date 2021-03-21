import { IFormTemplateService } from '../../../../shared/form-template/iform-template-service';
import { DeviceUartSettings } from './models/device-uart-settings';
import { Fetch } from '../../../../../core/service';
import { _iface, _line, _br, _parity, _size, _stop } from '../../../../devices-reporting/meter-settings/meter-settings-table/services/meter-settings-table-service';
export class DeviceUartSettingsService extends Fetch implements IFormTemplateService<DeviceUartSettings> {
  constructor() {
    super('/settings/uart');
  }
  get line() {
    return _line.map((t, index) => ({ id: index, name: t }));
  }
  get iface() {
    return _iface.map(t => ({ id: t[1], name: t[0] }));
  }
  get br() {
    return _br.map(t => ({ id: t[1], name: t[0] }));
  }
  get size() {
    return _size.map(t => ({ id: t[1], name: t[0] }));
  }
  get parity() {
    return _parity.map((t, index) => ({ id: index, name: t }));
  }
  get stop() {
    return _stop.map(t => ({ id: t[1], name: t[0] }));
  }
  getData = (): Promise<DeviceUartSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: DeviceUartSettings) => {
        sett.iface = (this.iface.find(x => x.id === (sett.iface as number))?.name)  || 'нет данных';
        sett.line = (this.line.find(x => x.id === (sett.line as number))?.name)  || 'нет данных';
        sett.br = (this.br.find(x => x.id === (sett.br as number))?.name)  || 'нет данных';
        sett.size = (this.size.find(x => x.id === (sett.size as number))?.name)  || 'нет данных';
        sett.parity = (this.parity.find(x => x.id === (sett.parity as number))?.name)  || 'нет данных';
        sett.stop = (this.stop.find(x => x.id === (sett.stop as number))?.name)  || 'нет данных';
        return sett;
      }));
  }
  saveData(data: DeviceUartSettings[]): Promise<Response> {
    return super.save(
      {
        Settings: data.map((sett: DeviceUartSettings) => {
                      sett = {...sett};
                      sett.iface = this.iface.find((v: any) => v.name === (sett.iface as string))?.id;
                      sett.iface = !sett.iface ? this.iface[0].id : sett.iface;
                      sett.line = this.line.find((v: any) => v.name === (sett.line as string))?.id;
                      sett.line = !sett.line ? this.line[0].id : sett.line;
                      sett.br = this.br.find((v: any) => v.name === (sett.br as string))?.id;
                      sett.br = !sett.br ? this.br[0].id : sett.br;
                      sett.size = this.size.find((v: any) => v.name === (sett.size as string))?.id;
                      sett.size = !sett.size ? this.size[0].id : sett.size;
                      sett.parity = this.parity.find((v: any) => v.name === (sett.parity as string))?.id;
                      sett.parity = !sett.parity ? this.parity[0].id : sett.parity;
                      sett.stop = this.stop.find((v: any) => v.name === (sett.stop as string))?.id;
                      sett.stop = !sett.stop ? this.stop[0].id : sett.stop;
                      return sett;
                  })
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}