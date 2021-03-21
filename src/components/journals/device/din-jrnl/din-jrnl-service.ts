import { Fetch } from '../../../../core/service';

export const dinJrnlSens = ['Дискретный вход 1','Дискретный вход 2','Дискретный вход 3','Дискретный вход 4','Перегрузка линий питания интерфейсов', 'Наличие основного питания(220В)', 'Наличие резервного питания(12В)', 'Наличие питания от аккумуляторной батареи(3.8В)', 'Заряд аккумуляторной батареи', 'Кнопка К1', 'Датчик вскрытия корпуса'];
export const dinJrnlState = ['Замкнут','Разомкнут'];
export class DinJrnlService extends Fetch {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(url: string) {
    super(url);
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.sens = dinJrnlSens[(jrnl.sens as number)];
        jrnl.state = dinJrnlState[(jrnl.state as number)];
        return jrnl;
      }));
  }

}