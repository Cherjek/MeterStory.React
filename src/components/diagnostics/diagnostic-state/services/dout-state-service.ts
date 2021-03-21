import { Fetch } from '../../../../core/service';
export const addrValues = ['PWR1','PWR2','PWR3','PWR4','PWR5'];
export const stateValues = ['Выключено','Включено'];
export class DoutStateService extends Fetch {
  constructor() {
    super('/state/dout');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map((sett: any) => {
        sett.addr = addrValues[(sett.addr as number)];
        sett.state = stateValues[(sett.state as number)];
        return sett;
      }));
  }
}