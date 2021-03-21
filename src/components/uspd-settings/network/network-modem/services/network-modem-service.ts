import { Fetch } from '../../../../../core/service';
export const modemAccess = ['Автоматически','GSM','UTRAN'];
export class NetworkModemService extends Fetch {
  constructor() {
    super('/settings/modem');
  }
  getData(): Promise<any[]> {
    return super
      .get()
      .then((res) => res.json())
      .then((modem) => 
        [modem].map(x => {
          x.access = modemAccess[x.access];
          return x;
        })
      );
  }
  saveData(data: any[]): Promise<Response> {
    data = data?.map(x => {
      x = {...x};
      x.access = modemAccess.findIndex(a => a === x.access);
      x.access = x.access === -1 ? 0 : x.access;
      return x;
    });
    if (data && data.length) {
      data = data[0];
    }
    if (!data) {
      return new Promise<Response>((res, rej) => {
        res();
      });
    }
    return super.save(data);
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}