import { Fetch } from '../../../../core/service';
export class DataFlashStateService extends Fetch {
  constructor(url?: string) {
    super(url ? url : '/state/dataflash');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State);
  }
}