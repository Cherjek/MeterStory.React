import { Fetch } from '../../../../core/service';
import { Utils } from '../../../../core/utils';
import { MeterMessage } from './models/meter-message';
import { MeterTableService } from '../services/meter-table-service';
export const protoValues = ['Протокол не указан','JSON протокол','Текстовый протокол UM-RTU','Протокол RTU-327'];
export const measures = [['текущие состояния реле','mRelay'],['текущие ПКЭ','mQual'],['текущие показания энергии','mEng'],['конфигурация','aCfg'],['срезы показаний энергии','aEng'],['срезы ПКЭ','aQual'],['показания на начало суток','aDay'],['потребление за сутки','aDayCons'],['показания на начало месяца','aMonth'],['потребление за месяц','aMonthCons'],['профили мощности','aCons'],['показания на начало часа','aHour'],['управление питанием','jrnlPwr'],['коррекция времени','jrnlTimeCorr'],['сброс показаний','jrnlReset'],['инициализация первого массива профилей','jrnlC1Init'],['инициализация второго массива профилей','jrnlC2Init'],['коррекция тарификатора','jrnlTrfCorr'],['открытие крышки','jrnlOpen'],['неавторизованный доступ','jrnlUnAyth'],['управление фазой А','jrnlPwrA'],['управление фазой В','jrnlPwrB'],['управление фазой С','jrnlPwrC'],['программирование','jrnlProg'],['управление реле','jrnlRelay'],['лимит суммарной энергии','jrnlLimESumm'],['потарифиный лимит энергии','jrnlLimETrf'],['лимит энергии тарифа 1','jrnlLimETrf1'],['лимит энергии тарифа 2','jrnlLimETrf2'],['лимит энергии тарифа 3','jrnlLimETrf3'],['лимит энергии тарифа 4','jrnlLimETrf4'],['ограничение максимального напряжения фазы А','jrnlLimUAMax'],['ограничение минимального напряжения фазы А','jrnlLimUAMin'],['ограничение максимального напряжения фазы В','jrnlLimUBMax'],['ограничение минимального напряжения фазы В','jrnlLimUBMin'],['ограничение максимального напряжения фазы С','jrnlLimUCMax'],['ограничение минимального напряжения фазы С','jrnlLimUCMin'],['ограничение максимального расхождения напряжения фаз А и В','jrnlLimUABMax'],['ограничение минимального расхождения напряжения фаз А и В','jrnlLimUABMin'],['ограничение максимального расхождения напряжения фаз В и С','jrnlLimUBCMax'],['ограничение минимального расхождения напряжения фаз В и С','jrnlLimUBCMin'],['ограничение максимального расхождения напряжения фаз С и А','jrnlLimUCAMax'],['ограничение минимального расхождения напряжения фаз С и А','jrnlLimUCAMin'],['ограничение максимального тока фазы А','jrnlLimIAMax'],['ограничение максимального тока фазы В','jrnlLimIBMax'],['ограничение максимального тока фазы С','jrnlLimICMax'],['ограничение максимальной частоты сети','jrnlLimFreqMax'],['ограничение минимальной частоты сети','jrnlLimFreqMin'],['ограничение мощности','jrnlLimPwr'],['ограничение прямой активной мощности','jrnlLimPwrPP'],['ограничение прямой реактивной мощности','jrnlLimPwrPM'],['ограничение обратной активной мощности','jrnlLimPwrQP'],['ограничение обратной реактивной мощности','jrnlLimPwrQP'],['реверс','jrnlRvr']];
export class MeterMessagesService extends Fetch {
  meterTableService = new MeterTableService();
  constructor() {
    super('/settings/messages/meter');
  }

  // set_meter_messages()
  private _measuresArray: any[];
  get measuresArray() {
    if (this._measuresArray == null) {
      this._measuresArray = measures.map(m => ({ code: m[1], name: m[0] }));
    }
    return this._measuresArray;
  }

  getData(): Promise<MeterMessage[]> {
    return new Promise((resolve, reject) => {
      this.meterTableService.getData('')
        .then((resultPus: string[]) => {
          super
          .get()
          .then((res) => res.json())
          .then(({ Settings }) => 
            {
              Settings?.map((message: MeterMessage) => {
                message.proto = protoValues[(message.proto as number)];
                if (message.Measure != null && message.Measure.length) {
                  message.Measure = this.measuresArray.find((x: any) => x.code === message.Measure[0])?.name;
                }
                if (message.MeterId != null && message.MeterId.length) {
                  message.MeterId = resultPus.find((x: string) => Utils.compareId(x, message.MeterId[0]));
                }
                return message;
              });
              resolve(Settings);
            }
          )
          .catch(error => reject(error));
        })
        .catch(error => reject(error));
      });
  }
  saveData(body: MeterMessage[]) {
    return super.save(
      {
        Settings: body.map((message: MeterMessage) => {
                      message = {...message};
                      message.proto = protoValues.findIndex((v: string) => v === (message.proto as string));
                      message.proto = message.proto === -1 ? 0 : message.proto;
                      if (message.Measure && typeof message.Measure === 'string') {
                        const m = this.measuresArray.find((x: any) => x.name === message.Measure);
                        if (m) { message.Measure = [m.code]; }
                        else { message.Measure = undefined; }
                      } else {
                        message.Measure = [this.measuresArray[0].code];
                      }
                      if (message.MeterId && typeof message.MeterId === 'string') {
                        message.MeterId = [Number(Utils.parseId(message.MeterId))]
                      }
                      return message;
                  })
    });
  }

  deleteData(body: MeterMessage) {
    return super.delete({ Settings: [{...body}] });
  }

  clearData() {
    return super.clear();
  }
}