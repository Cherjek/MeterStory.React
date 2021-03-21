import { Fetch } from '../../../../core/service';
export const pppResource = ['ГНеизвестно','Соединение открыто','Соединение закрыто', 'Ошибка инициализации соединения', 'Ошибка установки соединения', 'Ошибка ожидания соединения'];
export class PppClientService extends Fetch {
  constructor() {
    super('/jrnl/ppp/clconn');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.res = pppResource[(jrnl.res as number)];
        return jrnl;
      }));
  }
}