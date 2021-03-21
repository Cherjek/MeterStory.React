import { Fetch } from '../../../../core/service';
import { AuthSettings } from './models/auth-settings';

export const level = ['Нет доступа', 'Пользователь', 'Администратор'];

export class AuthSettingsService extends Fetch {
  constructor() {
    super('/settings/proto/json/auth');
  }

  getData = (): Promise<AuthSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: AuthSettings) => {
        sett.lvl = level[(sett.lvl as number)];
        return sett;
      }));
  }

  saveData(body: AuthSettings[]) {
    return super.save(
      { 
        Settings: body.map((sett: AuthSettings) => {
                      sett = {...sett};
                      sett.lvl = level.findIndex((v: string) => v === (sett.lvl as string));
                      sett.lvl = sett.lvl === -1 ? 0 : sett.lvl;
                      return sett;
                  }) 
    });
  }

  deleteData(body: AuthSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}
