import { Fetch } from '../../../../core/service';
export const addrAinValues = ['Напряжение батареи ЧРВ, В','Резервное напряжение, В','Температура SIM карты, С','Напряжение аккумуляторной батареи, В'];
export class AinStateService extends Fetch {
  constructor() {
    super('/state/ain');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map((sett) => {
        sett.addr = addrAinValues[(sett.addr as number)];
        return sett;
      }));
  }
}