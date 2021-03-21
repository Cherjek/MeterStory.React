import { Fetch } from '../../../../core/service';
export const ifaceResource = ['Отсутствует','Ethernet','Modem'];
export class NetworkService extends Fetch {
  constructor() {
    super('/jrnl/srvconn');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.iface = ifaceResource[(jrnl.iface as number)];
        return jrnl;
      }));
  }
}