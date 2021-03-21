import { Fetch } from '../../../../core/service';
export class NetworkStateService extends Fetch {
  constructor(url?: string) {
    super(url ? url : '/state/dataflash');
  }
  getData = (): Promise<any> => {
    return Promise.all([
      new NetworkInterfaceService().getData(),
      new NetworkSocketService().getData()
    ])
    .then((res: any[]) => ({ interfaces: res[0], sockets: res[1] }));
  }
}

// tslint:disable-next-line: max-classes-per-file
class NetworkInterfaceService extends Fetch {
  constructor() {
    super('/state/network');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map(x => {
        x.link = x.link ? 'да' : 'нет';
        return x;
      }));
  }
}

// tslint:disable-next-line: max-classes-per-file
class NetworkSocketService extends Fetch {
  constructor() {
    super('/state/socket');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State);
  }
}