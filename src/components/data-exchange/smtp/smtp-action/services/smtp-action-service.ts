import { Fetch } from '../../../../../core/service';
import { Utils } from '../../../../../core/utils';
import { SmtpActionSettings } from './models/smtp-action-settings';
import { typeEvents, typeTemplates } from '../../../shared/services/data-grid-columns-callback';
import { EventTypeService } from '../../../shared/services/event-type-service';
import { SmtpServersService } from '../../../shared/services/smtp-servers-service';
import { AddressService } from '../../../shared/services/address-service';
export class SmtpActionService extends Fetch {
  eventTypeService = new EventTypeService();
  smtpServersService = new SmtpServersService();
  addressService = new AddressService();
  constructor() {
    super('/settings/actions/smtp');
  }
  getData = (): Promise<SmtpActionSettings[]> => {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.eventTypeService.getData('Расписание'),
        this.eventTypeService.getData('Сообщение оператора'),
        this.eventTypeService.getData('Данные прибора учета'),
        this.smtpServersService.getData(''),
        this.addressService.getData('')
      ])
      .then(
          (
            result: [
              string[],
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
                Settings?.map((sett: SmtpActionSettings) => {
                    sett.eventType = typeEvents[(sett.eventType as number)];
                    sett.msgType = typeTemplates[(sett.msgType as number)];
                    if (sett.eventType === 'Расписание') {
                      sett.eventId = result[0].find((x: string) => Utils.compareId(x, sett.eventId as string));
                    } 
                    let resMsg;
                    if (sett.msgType === 'Сообщение оператора') {
                      resMsg = result[1];
                    } 
                    else if (sett.msgType === 'Данные прибора учета') {
                      resMsg = result[2];
                    }
                    sett.msgId = resMsg.find((x: string) => Utils.compareId(x, sett.msgId as string));
                    sett.srvId = result[3].find((x: string) => Utils.compareId(x, sett.srvId as string));
                    sett.addrId = result[4].find((x: string) => Utils.compareId(x, sett.addrId as string));
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
  saveData(body: SmtpActionSettings[]) {
    return super.save(
      { 
        Settings: body.map((sett: SmtpActionSettings) => {
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
                      if (sett.addrId) sett.addrId = Utils.parseId(sett.addrId as string);
                      return sett;
                  }) 
    });
  }

  clearData() {
    return super.clear();
  }
}