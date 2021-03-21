import { Fetch } from '../../../../core/service';
import { Message } from './models/message';
export const typeMessages = ['ASCII','Unicode','HEX'];
export class MessagesOperatorService extends Fetch {
  constructor() {
    super('/settings/messages/custom');
  }
  getData(): Promise<Message[]> {
    return super
    .get()
    .then((res) => res.json())
    .then(({ Settings }) => Settings?.map((sett: Message) => {
      sett.type = typeMessages[(sett.type as number)];
      return sett;
    }));
  }
  
  saveData(body: Message[]) {
    return super.save(
      {
        Settings: body.map((sett: Message) => {
                      sett = {...sett};
                      sett.type = typeMessages.findIndex((v: string) => v === (sett.type as string));
                      sett.type = sett.type === -1 ? 0 : sett.type;
                      return sett;
                  })
    });
  }

  deleteData(body: Message) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}