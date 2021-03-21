import { MeterSettingsTableService } from '../../../devices-reporting/meter-settings/meter-settings-table/services/meter-settings-table-service';
import { ICallbackColumnService } from '../../../common/data-grid/icallback-service';

export class MeterTableService implements ICallbackColumnService {
  meterSettingsTableService: MeterSettingsTableService;
  static tablePus: string[];
  getData(dependVal: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (MeterTableService.tablePus == null) {
        if (this.meterSettingsTableService == null) this.meterSettingsTableService = new MeterSettingsTableService();
        this.meterSettingsTableService
          .getData()
          .then((result) => {
            MeterTableService.tablePus = ['', ...result?.map(
              (pu) =>
                `id: ${pu.id}, ${pu.type}, ${pu.iface}, ${pu.addr}`
            )];
            resolve(MeterTableService.tablePus);
          });
      } else {
        resolve(MeterTableService.tablePus);
      }
    });
  }
}