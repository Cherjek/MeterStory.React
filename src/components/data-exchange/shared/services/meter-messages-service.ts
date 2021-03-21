import { Fetch } from '../../../../core/service';
import { Utils } from '../../../../core/utils';
import { MeterMessage } from './models/meter-message';
import { MeterTableService } from '../services/meter-table-service';
export const protoValues = ['Протокол не указан','JSON протокол','Текстовый протокол UM-RTU','Протокол RTU-327'];
export const measures = [['Текущие состояния реле','mRelay'],['Текущие ПКЭ','mQual'],['Текущие показания энергии','mEng'],['Конфигурация','aCfg'],['Срезы показаний энергии','aEng'],['Срезы ПКЭ','aQual'],['Показания на начало суток','aDay'],['Потребление за сутки','aDayCons'],['Показания на начало месяца','aMonth'],['Потребление за месяц','aMonthCons'],['Профили мощности','aCons'],['Показания на начало часа','aHour'],['Управление питанием','jrnlPwr'],['Коррекция времени','jrnlTimeCorr'],['Сброс показаний','jrnlReset'],['Инициализация первого массива профилей','jrnlC1Init'],['Инициализация второго массива профилей','jrnlC2Init'],['Коррекция тарификатора','jrnlTrfCorr'],['Открытие крышки','jrnlOpen'],['Неавторизованный доступ','jrnlUnAyth'],['Управление фазой А','jrnlPwrA'],['Управление фазой В','jrnlPwrB'],['Управление фазой С','jrnlPwrC'],['Программирование','jrnlProg'],['Управление реле','jrnlRelay'],['Лимит суммарной энергии','jrnlLimESumm'],['Потарифиный лимит энергии','jrnlLimETrf'],['Лимит энергии тарифа 1','jrnlLimETrf1'],['Лимит энергии тарифа 2','jrnlLimETrf2'],['Лимит энергии тарифа 3','jrnlLimETrf3'],['Лимит энергии тарифа 4','jrnlLimETrf4'],['Ограничение максимального напряжения фазы А','jrnlLimUAMax'],['Ограничение минимального напряжения фазы А','jrnlLimUAMin'],['Ограничение максимального напряжения фазы В','jrnlLimUBMax'],['Ограничение минимального напряжения фазы В','jrnlLimUBMin'],['Ограничение максимального напряжения фазы С','jrnlLimUCMax'],['Ограничение минимального напряжения фазы С','jrnlLimUCMin'],['Ограничение максимального расхождения напряжения фаз А и В','jrnlLimUABMax'],['Ограничение минимального расхождения напряжения фаз А и В','jrnlLimUABMin'],['Ограничение максимального расхождения напряжения фаз В и С','jrnlLimUBCMax'],['Ограничение минимального расхождения напряжения фаз В и С','jrnlLimUBCMin'],['Ограничение максимального расхождения напряжения фаз С и А','jrnlLimUCAMax'],['Ограничение минимального расхождения напряжения фаз С и А','jrnlLimUCAMin'],['Ограничение максимального тока фазы А','jrnlLimIAMax'],['Ограничение максимального тока фазы В','jrnlLimIBMax'],['Ограничение максимального тока фазы С','jrnlLimICMax'],['Ограничение максимальной частоты сети','jrnlLimFreqMax'],['Ограничение минимальной частоты сети','jrnlLimFreqMin'],['Ограничение мощности','jrnlLimPwr'],['Ограничение прямой активной мощности','jrnlLimPwrPP'],['Ограничение прямой реактивной мощности','jrnlLimPwrPM'],['Ограничение обратной активной мощности','jrnlLimPwrQP'],['Ограничение обратной реактивной мощности','jrnlLimPwrQP'],['Реверс','jrnlRvr']];
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