import { Fetch } from '../../../../../core/service';
import { Data } from './models/data';
import { MeterJournalRequest } from './models/request-data';

const journals = [/*['Обмен данными','jrnlAnsw'],*/['Управление питанием','jrnlPwr'],['Коррекция времени','jrnlTimeCorr'],['Сброс показаний','jrnlReset'],['Инициализация первого массива профилей','jrnlC1Init'],['Инициализация второго массива профилей','jrnlC2Init'],['Коррекция тарификатора','jrnlTrfCorr'],['Открытие крышки','jrnlOpen'],['Неавторизованный доступ','jrnlUnAyth'],['Управление фазой А','jrnlPwrA'],['Управление фазой В','jrnlPwrB'],['Управление фазой С','jrnlPwrC'],['Программирование','jrnlProg'],['Управление реле','jrnlRelay'],['Лимит суммарной энергии','jrnlLimESumm'],['Потарифиный лимит энергии','jrnlLimETrf'],['Лимит энергии тарифа 1','jrnlLimETrf1'],['Лимит энергии тарифа 2','jrnlLimETrf2'],['Лимит энергии тарифа 3','jrnlLimETrf3'],['Лимит энергии тарифа 4','jrnlLimETrf4'],['Ограничение максимального напряжения фазы А','jrnlLimUAMax'],['Ограничение минимального напряжения фазы А','jrnlLimUAMin'],['Ограничение максимального напряжения фазы В','jrnlLimUBMax'],['Ограничение минимального напряжения фазы В','jrnlLimUBMin'],['Ограничение максимального напряжения фазы С','jrnlLimUCMax'],['Ограничение минимального напряжения фазы С','jrnlLimUCMin'],['Ограничение максимального расхождения напряжения фаз А и В','jrnlLimUABMax'],['Ограничение минимального расхождения напряжения фаз А и В','jrnlLimUABMin'],['Ограничение максимального расхождения напряжения фаз В и С','jrnlLimUBCMax'],['Ограничение минимального расхождения напряжения фаз В и С','jrnlLimUBCMin'],['Ограничение максимального расхождения напряжения фаз С и А','jrnlLimUCAMax'],['Ограничение минимального расхождения напряжения фаз С и А','jrnlLimUCAMin'],['Ограничение максимального тока фазы А','jrnlLimIAMax'],['Ограничение максимального тока фазы В','jrnlLimIBMax'],['Ограничение максимального тока фазы С','jrnlLimICMax'],['Ограничение максимальной частоты сети','jrnlLimFreqMax'],['Ограничение минимальной частоты сети','jrnlLimFreqMin'],['Ограничение мощности','jrnlLimPwr'],['Ограничение прямой активной мощности','jrnlLimPwrPP'],['Ограничение прямой реактивной мощности','jrnlLimPwrPM'],['Ограничение обратной активной мощности','jrnlLimPwrQP'],['Ограничение обратной реактивной мощности','jrnlLimPwrQP'],['Реверс','jrnlRvr']];

export class MeterDataJournalService extends Fetch {
  constructor() {
    super('/meter/data');
  }

  getJournals = () => {
    return journals.map((d) => Object.assign(new Data(), { code: d[1], name: d[0] }));
  }

  getJournalRecord = (req: MeterJournalRequest) => {
    return super.set(req)
      .then((res) => res.json())
      .then(res => this.journalResponseParse(res));
  }

  journalResponseParse = (response) => {
    const journals = [];
    for (let i = 0; i < response.measures[0].devices.length; i++) {
      for (let j = 0; j < response.measures[0].devices[i].vals.length; j++) {
        const journal = {};
        journal["id"] = response.measures[0].devices[i].id;
        journal["serial"] = response.measures[0].devices[i].serial;
        journal["type"] = response.measures[0].measure;
        journal["time"] = response.measures[0].devices[i].vals[j].ts;
        journal["timediff"] = response.measures[0].devices[i].vals[j].diff;
        for (let k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
        {
          if ( response.measures[0].devices[i].vals[j].tags[k].tag === "eventId" )
            journal["eId"] = response.measures[0].devices[i].vals[j].tags[k].val;
          if ( response.measures[0].devices[i].vals[j].tags[k].tag === "event" )
            journal["etype"] = response.measures[0].devices[i].vals[j].tags[k].val;
        }
        journals.push(journal);
      }
    }
    return journals;
  }
}