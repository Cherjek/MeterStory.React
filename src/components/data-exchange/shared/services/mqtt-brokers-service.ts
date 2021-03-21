import { MqttSettingsService } from '../../mqtt/mqtt-settings/services/mqtt-settings-service';
import { ICallbackColumnService } from '../../../common/data-grid/icallback-service';

export class MqttBrokersService implements ICallbackColumnService {
  mqttSettingsService: MqttSettingsService;
  static brokers: string[];
  getData(dependVal: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (MqttBrokersService.brokers == null) {
        if (this.mqttSettingsService == null) this.mqttSettingsService = new MqttSettingsService();
        this.mqttSettingsService
          .getData()
          .then((result) => {
            MqttBrokersService.brokers = ['', ...result?.map(
              (v) =>
                `id: ${v.id}, login: ${v.login}, адрес: ${v.addr}, тип: ${v.type}`
            )];
            resolve(MqttBrokersService.brokers);
          });
      } else {
        resolve(MqttBrokersService.brokers);
      }
    });
  }
}
