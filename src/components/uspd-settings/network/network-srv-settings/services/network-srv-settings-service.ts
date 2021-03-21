import { Fetch } from '../../../../../core/service';
import { NetworkSrvSettings } from './models/network-srv-settings';
export const typeServer = ['Отсутствует','HTTP сервер','Сервер текстового протокола','Сервер RTU327','Сервер транзита интерфейса 1','Сервер транзита интерфейса 2','Сервер транзита интерфейса 3','Сервер транзита интерфейса 4','Сервер транзита интерфейса 5','Сервер транзита интерфейса модема'];
export class NetworkSrvSettingsService extends Fetch {
  constructor() {
    super('/settings/servers/tcp');
  }
  getData = (): Promise<NetworkSrvSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: NetworkSrvSettings) => {
        sett.type = typeServer[(sett.type as number)];
        return sett;
      }));
  }

  saveData(body: NetworkSrvSettings[]) {
    return super.save(
      {
        Settings: body.map((sett: NetworkSrvSettings) => {
                      sett = {...sett};
                      sett.type = typeServer.findIndex((v: string) => v === (sett.type as string));
                      sett.type = sett.type === -1 ? 0 : sett.type;
                      return sett;
                  })
    });
  }

  deleteData(body: NetworkSrvSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}