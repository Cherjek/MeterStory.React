import { Fetch } from '../../../../core/service';
import { DinState } from './models/din-state';
export const addrValues = ['Дискретный вход 1','Дискретный вход 2','Дискретный вход 3','Дискретный вход 4','Перегрузка линий питания интерфейсов', 'Наличие основного питания(220В)', 'Наличие резервного питания(12В)','Наличие питания от аккумуляторной батареи(3.8В)', 'Заряд аккумуляторной батареи', 'Кнопка К1','Датчик вскрытия корпуса'];
export const stateValues = ['Замкнут','Разомкнут'];
export class DinStateService extends Fetch {
  constructor() {
    super('/state/din');
  }
  getData = (): Promise<DinState[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ State }) => State?.map((sett: DinState) => {
        sett.addr = addrValues[(sett.addr as number)];
        sett.state = stateValues[(sett.state as number)];
        return sett;
      }));
  }

  // saveData(body: DinState[]) {
  //   return super.save(
  //     {
  //       Settings: body.map((sett: DinState) => {
  //                     sett = {...sett};
  //                     sett.addr = addrValues.findIndex((v: string) => v === (sett.addr as string));
  //                     sett.addr = sett.addr === -1 ? 0 : sett.addr;
  //                     sett.state = stateValues.findIndex((v: string) => v === (sett.state as string));
  //                     sett.state = sett.state === -1 ? 0 : sett.state;
  //                     return sett;
  //                 })
  //   });
  // }
}