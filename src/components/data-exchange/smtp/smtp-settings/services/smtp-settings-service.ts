import { Fetch } from '../../../../../core/service';
import { SmtpSettings } from './models/smtp-settings';

export const smtpAuthport = ['По умолчанию','Без авторизации','Метод авторизации: Login','Метод авторизации: Plain'];
export const smtpCport = ['По умолчанию','Без шифрования','Шифрование соединения','STARTTSL'];

export class SmtpSettingsService extends Fetch {
  constructor() {
    super('/settings/servers/smtp');
  }

  getData = (): Promise<SmtpSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: SmtpSettings) => {
        sett.auth = smtpAuthport[(sett.auth as number)];
        sett.crypto = smtpCport[(sett.crypto as number)];
        return sett;
      }));
  }

  saveData(body: SmtpSettings[]) {
    return super.save(
      {
        Settings: body.map((sett: SmtpSettings) => {
                      sett = {...sett};
                      sett.auth = smtpAuthport.findIndex((v: string) => v === (sett.auth as string));
                      sett.auth = sett.auth === -1 ? 0 : sett.auth;
                      sett.crypto = smtpCport.findIndex((v: string) => v === (sett.crypto as string));
                      sett.crypto = sett.crypto === -1 ? 0 : sett.crypto;
                      return sett;
                  })
    });
  }

  deleteData(body: SmtpSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}
