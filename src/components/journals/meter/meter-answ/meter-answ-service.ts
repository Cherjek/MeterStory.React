import { Fetch } from '../../../../core/service';
import { _type, _iface } from '../../../devices-reporting/meter-settings/meter-settings-table/services/meter-settings-table-service';
export class MeterAnswService extends Fetch {
  constructor() {
    super('/jrnl/meter/answ');
  }
  get type() {
    return _type.map(t => ({ id: t[1], name: t[0] }));
  }
  get iface() {
    return _iface.map(t => ({ id: t[1], name: t[0] }));
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.type = (this.type.find(x => x.id === (jrnl.type as number))?.name) || 'нет данных';
        jrnl.iface = (this.iface.find(x => x.id === (jrnl.iface as number))?.name)  || 'нет данных';
        jrnl.answer = jrnl.answer ? 'да' : 'нет';
        return jrnl;
      }));
  }
}