import { Fetch } from '../../../../core/service';
import { TextProtoAuthSettings } from './models/text-proto-auth-settings';

export const level = ["Нет доступа","Пользователь","Конфигуратор","Завод"];

export class TextProtoAuthSettingsService extends Fetch {
  constructor() {
    super('/settings/proto/text/auth');
  }

  getData = () => {
    return super.get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: TextProtoAuthSettings) => {
        sett.lvl = level[(sett.lvl as number)];
        return sett;
    }));
  }

  saveData(body: TextProtoAuthSettings[]) {
    return super.save(
      { 
        Settings: body.map((sett: TextProtoAuthSettings) => {
                      sett = {...sett};
                      sett.lvl = level.findIndex((v: string) => v === (sett.lvl as string));
                      sett.lvl = sett.lvl === -1 ? 0 : sett.lvl;
                      return sett;
                  }) 
    });
  }

  deleteData(body: TextProtoAuthSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}