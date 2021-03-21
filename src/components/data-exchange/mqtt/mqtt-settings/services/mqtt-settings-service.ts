import { Fetch } from '../../../../../core/service';
import { MqttSettings } from './models/mqtt-settings';

export const mqttSettingsType = ['MQTT 3.1.1','MQTT SN'];
export const mqttSettingsCropt = ['По умолчанию','Без шифрования','Шифрование соединения'];

export class MqttSettingsService extends Fetch {
  constructor() {
    super('/settings/servers/mqtt');
  }

  getData = (): Promise<MqttSettings[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Settings }) => Settings?.map((sett: MqttSettings) => {
        sett.type = mqttSettingsType[(sett.type as number)];
        sett.crypto = mqttSettingsCropt[(sett.crypto as number)];
        return sett;
      }));
  }

  saveData(body: MqttSettings[]) {
    return super.save(
      {
        Settings: body.map((sett: MqttSettings) => {
                      sett = {...sett};
                      sett.type = mqttSettingsType.findIndex((v: string) => v === (sett.type as string));
                      sett.type = sett.type === -1 ? 0 : sett.type;
                      sett.crypto = mqttSettingsCropt.findIndex((v: string) => v === (sett.crypto as string));
                      sett.crypto = sett.crypto === -1 ? 0 : sett.crypto;
                      return sett;
                  })
    });
  }

  deleteData(body: MqttSettings) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}
