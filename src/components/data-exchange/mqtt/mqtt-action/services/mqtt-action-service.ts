import { Fetch } from '../../../../../core/service';
import { Utils } from '../../../../../core/utils';
import { MqttActionSettings } from './models/mqtt-action-settings';
import { typeEvents, typeTemplates } from '../../../shared/services/data-grid-columns-callback';
import { EventTypeService } from '../../../shared/services/event-type-service';
import { MqttBrokersService } from '../../../shared/services/mqtt-brokers-service';
export class MqttActionService extends Fetch {
  eventTypeService = new EventTypeService();
  mqttBrokersService = new MqttBrokersService();
  constructor() {
    super('/settings/actions/mqtt');
  }
  getData = (): Promise<MqttActionSettings[]> => {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.eventTypeService.getData('Расписание'),
        this.eventTypeService.getData('Сообщение оператора'),
        this.eventTypeService.getData('Данные прибора учета'),
        this.mqttBrokersService.getData('')
      ])
      .then(
          (
            result: [
              string[],
              string[],
              string[],
              string[]
            ]
          ) => {
            super
              .get()
              .then((res) => res.json())
              .then(({ Settings }) => {
                Settings?.map((sett: MqttActionSettings) => {
                    sett.eventType = typeEvents[(sett.eventType as number)];
                    sett.msgType = typeTemplates[(sett.msgType as number)];
                    if (sett.eventType === 'Расписание') {
                      sett.eventId = result[0].find((x: string) => Utils.compareId(x, sett.eventId as string));
                    } 
                    let resultMg;
                    if (sett.msgType === 'Сообщение оператора') {
                      resultMg = result[1];
                    } 
                    else if (sett.msgType === 'Данные прибора учета') {
                      resultMg = result[2];
                    }
                    sett.msgId = resultMg.find((x: string) => Utils.compareId(x, sett.msgId as string));
                    sett.srvId = result[3].find((x: string) => Utils.compareId(x, sett.srvId as string));
                    return sett;
                });
                resolve(Settings);
              })
              .catch(error => reject(error));
          }
        )
        .catch(error => reject(error));
    });
  }
  saveData(body: MqttActionSettings[]) {
    return super.save(
      { 
        Settings: body.map((sett: MqttActionSettings) => {
                      sett = {...sett};
                      if (sett.eventType) {
                        sett.eventType = typeEvents.findIndex((v: string) => v === (sett.eventType as string));
                        sett.eventType = sett.eventType === -1 ? 0 : sett.eventType;
                      }
                      if (sett.msgType) {
                        sett.msgType = typeTemplates.findIndex((v: string) => v === (sett.msgType as string));
                        sett.msgType = sett.msgType === -1 ? 0 : sett.msgType;
                      }
                      if (sett.eventId) sett.eventId = Utils.parseId(sett.eventId as string);
                      if (sett.msgId) sett.msgId = Utils.parseId(sett.msgId as string);
                      if (sett.srvId) sett.srvId = Utils.parseId(sett.srvId as string);
                      return sett;
                  }) 
    });
  }

  clearData() {
    return super.clear();
  }
}