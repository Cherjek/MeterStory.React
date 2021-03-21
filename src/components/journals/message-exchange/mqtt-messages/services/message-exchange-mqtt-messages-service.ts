import { Fetch } from '../../../../../core/service';
export const statusMqttMessages = ['Публикация','Чтение'];
export class MessageExchangeMqttMessagesService extends Fetch {
  constructor() {
    super('/jrnl/mqtt/message');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.status = statusMqttMessages[(jrnl.status as number)];
        return jrnl;
      }));
  }
}