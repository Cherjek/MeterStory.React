import { Fetch } from '../../../../core/service';
export class UartStateService extends Fetch {
  constructor(url?: string) {
    super(url ? url : '/state/uart');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map(x => {
        x.lock = x.lock ? 'да' : 'нет';
        return x;
      }));
  }
}