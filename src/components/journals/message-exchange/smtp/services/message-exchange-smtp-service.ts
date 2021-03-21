import { Fetch } from '../../../../../core/service';
export const resValues = ['Успешно отправлено','Неизвестная ошибка','Ошибка соединения с сервером','Неверное имя сервера','Сервер сбросил соединение','Таймаут','Неизвестный ответ сервера','Ошибка файла сообщения','Ошибка SSL инициализации','Ошибка SSL handshake','Ошибка авторизации','Неизвестные параметры сервера','Ошибка отправки тела сообщения'];
export class MessageExchangeSmtpService extends Fetch {
  constructor() {
    super('/jrnl/mail/send');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.res = resValues[(jrnl.res as number)];
        return jrnl;
      }));
  }
}