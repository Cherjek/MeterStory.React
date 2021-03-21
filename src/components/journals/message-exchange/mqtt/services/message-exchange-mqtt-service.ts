import { Fetch } from '../../../../../core/service';
export const resValues = ['Подключение завершено штатно','Отсутствуют активные сетевые интерфейсы','Ошибка установки соединения с брокером','Ошибка установки защищенного соединения с брокером','Неверный тип протокола','Неверный идентификатор устройства','Сервер недоступен','Неверный логин/пароль','Ошибка авторизации','Неожиданный тип пакета','Неожиданное завершение соединения','Неверная длина пакета','Неизвестные данные пакета','Ошибка чтения сообщения с диска','Ошибка подписки на топик'];
export class MessageExchangeMqttService extends Fetch {
  constructor() {
    super('/jrnl/mqtt/connect');
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