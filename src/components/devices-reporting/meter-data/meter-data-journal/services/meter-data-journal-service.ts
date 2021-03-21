import { Fetch } from '../../../../../core/service';
import { Data } from './models/data';
import { MeterJournalRequest } from './models/request-data';

const journals = [['обмен данными','jrnlAnsw'],['управление питанием','jrnlPwr'],['коррекция времени','jrnlTimeCorr'],['сброс показаний','jrnlReset'],['инициализация первого массива профилей','jrnlC1Init'],['инициализация второго массива профилей','jrnlC2Init'],['коррекция тарификатора','jrnlTrfCorr'],['открытие крышки','jrnlOpen'],['неавторизованный доступ','jrnlUnAyth'],['управление фазой А','jrnlPwrA'],['управление фазой В','jrnlPwrB'],['управление фазой С','jrnlPwrC'],['программирование','jrnlProg'],['управление реле','jrnlRelay'],['лимит суммарной энергии','jrnlLimESumm'],['потарифиный лимит энергии','jrnlLimETrf'],['лимит энергии тарифа 1','jrnlLimETrf1'],['лимит энергии тарифа 2','jrnlLimETrf2'],['лимит энергии тарифа 3','jrnlLimETrf3'],['лимит энергии тарифа 4','jrnlLimETrf4'],['ограничение максимального напряжения фазы А','jrnlLimUAMax'],['ограничение минимального напряжения фазы А','jrnlLimUAMin'],['ограничение максимального напряжения фазы В','jrnlLimUBMax'],['ограничение минимального напряжения фазы В','jrnlLimUBMin'],['ограничение максимального напряжения фазы С','jrnlLimUCMax'],['ограничение минимального напряжения фазы С','jrnlLimUCMin'],['ограничение максимального расхождения напряжения фаз А и В','jrnlLimUABMax'],['ограничение минимального расхождения напряжения фаз А и В','jrnlLimUABMin'],['ограничение максимального расхождения напряжения фаз В и С','jrnlLimUBCMax'],['ограничение минимального расхождения напряжения фаз В и С','jrnlLimUBCMin'],['ограничение максимального расхождения напряжения фаз С и А','jrnlLimUCAMax'],['ограничение минимального расхождения напряжения фаз С и А','jrnlLimUCAMin'],['ограничение максимального тока фазы А','jrnlLimIAMax'],['ограничение максимального тока фазы В','jrnlLimIBMax'],['ограничение максимального тока фазы С','jrnlLimICMax'],['ограничение максимальной частоты сети','jrnlLimFreqMax'],['ограничение минимальной частоты сети','jrnlLimFreqMin'],['ограничение мощности','jrnlLimPwr'],['ограничение прямой активной мощности','jrnlLimPwrPP'],['ограничение прямой реактивной мощности','jrnlLimPwrPM'],['ограничение обратной активной мощности','jrnlLimPwrQP'],['ограничение обратной реактивной мощности','jrnlLimPwrQP'],['реверс','jrnlRvr']];

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