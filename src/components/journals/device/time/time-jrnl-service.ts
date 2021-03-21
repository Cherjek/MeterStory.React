import { Fetch } from '../../../../core/service';
export const sourceTime = ['Синхронизация(SNTP)','Установка(RTU-327)','Установка(HTTP)','Установка(Текстовый протокол)'];
export class TimeJrnlService extends Fetch {
  constructor() {
    super('/jrnl/time');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.source = sourceTime[(jrnl.source as number)];
        return jrnl;
      }));
  }

}