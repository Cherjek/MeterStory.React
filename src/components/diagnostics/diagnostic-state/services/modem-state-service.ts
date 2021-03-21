import { Fetch } from '../../../../core/service';
const CREG = [
  'Нет регистрации. Поиск сети не ведется',
  'Зарегистрировано в домашней сети',
  'Нет регистрации. Ведется поиск сети',
  'Регистрация отклонена',
  'Неизвестно',
  'Зарегистрировано в роуминге'
];
const CGREG = [
  'Нет регистрации. Поиск сети не ведется',
	'Зарегистрировано в домашней сети',
	'Нет регистрации. Ведется поиск сети',
	'Регистрация отклонена',
	'Неизвестно',
	'Зарегистрировано в роуминге'
];
export class ModemStateService extends Fetch {
  constructor(url?: string) {
    super(url ? url : '/state/modem');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then((response: any) => {
        const properties = [];
        properties.push({property:'Тип модема:',value:response.info});
        properties.push({property:'Идентификатор модема(IMEI):',value:response.imei});
        properties.push({property:'Идентификатор сим-карты(CCID):',value:response.ccid});
        properties.push({property:'Оператор сотовой связи:',value:response.ops});
        properties.push({property:'Регистрация в сети (CREG):',value:response.creg == null ? CREG[4] : CREG[response.creg]});
        properties.push({property:'Регистрация в сети (CGREG):',value:response.cgreg == null ? CGREG[4] : CGREG[response.cgreg]});
        properties.push({property:'Уровень сигнала(CSQ):',value:response.csq});
        properties.push({property:'Корректный PIN код:',value:response.pinRes ? 'Да' : 'Нет'});
        return properties;
      });
  }
}