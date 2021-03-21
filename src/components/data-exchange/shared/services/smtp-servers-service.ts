import { SmtpSettingsService } from '../../smtp/smtp-settings/services/smtp-settings-service';
import { ICallbackColumnService } from '../../../common/data-grid/icallback-service';

export class SmtpServersService implements ICallbackColumnService {
  smtpSettingsService: SmtpSettingsService;
  static smtpServers: string[];
  getData(dependVal: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (SmtpServersService.smtpServers == null) {
        if (this.smtpSettingsService == null) this.smtpSettingsService = new SmtpSettingsService();
        this.smtpSettingsService
          .getData()
          .then((result) => {
            SmtpServersService.smtpServers = ['', ...result?.map(
              (v) =>
                `id: ${v.id}, от: ${v.from}, адрес: ${v.addr}`
            )];
            resolve(SmtpServersService.smtpServers);
          });
      } else {
        resolve(SmtpServersService.smtpServers);
      }
    });
  }
}
