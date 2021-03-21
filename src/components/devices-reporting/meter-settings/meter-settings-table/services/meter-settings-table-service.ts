import { Fetch } from '../../../../../core/service';
import { MeterSettingsTable } from './models/meter-settings-table';

export const _groupsTypeMeter = [
  // 0 - электросчетчики
  [
    ['Меркурий200',1],['Меркурий203',31],['Меркурий206',32],['Меркурий230',3],['Меркурий234 СПОДЭС',36],['Меркурий225.2',91],
    ['СЕ102',8],['СЕ102М',11],['СЕ301',6],['СЕ303',5],['СЭБ2А',2],['ПСЧ3ТА',17],['СЭТ4ТМ',4],['ПСЧхТМ',10],
    ['СОЭ55/215',24],['СОЭ55/217',22],['СОЭ55/415',30],
    ['ТОПАЗ',33],['НЕВА1xx',26],['НЕВА3xx',27],['Милур10x',28],['Милур30x',29],
    ['Альфа1140',25],['СТЭ561',23],['ИНТЕГРА10х',35],['FX868',92]
  ],
  // 1 - концентраторы импульсных счетчиков
  [
    ['УМТВ10',9],['Пульсар',93]
  ],
  // 2 - радиоконцентраторы и радиоретрансляторы
  [
    
  ],
  // 3 - контроллеры ввода/вывода дискретных сигналов
  [
    ['ST410',192]
  ]
];
export const _groupsTypeMeterDictionary = [
  { id: 0, name: 'Электросчетчики' },
  { id: 1, name: 'Концентраторы импульсных счетчиков' },
  { id: 2, name: 'Радиоконцентраторы и радиоретрансляторы' },
  { id: 3, name: 'Контроллеры ввода/вывода дискретных сигналов' }
];
export const getIndexGroupTypeMeter = (val: number | string) => {
  let res = -1;
  _groupsTypeMeter.forEach((g, index) => {
    if (g.find(x => val === (typeof val === 'string' ? x[0] : x[1])) != null) res = index;
  });
  return res;
}
export const _type = _groupsTypeMeter.filter(x => x.length).map(x => x).reduce((l1, l2) => [...l1, ...l2]);
export const _line = ['Автоматически','Линия питания 1','Линия питания 2','Линия питания 3','Линия питания 4','Линия питания 5'];
export const _iface = [['Интерфейс 1',0],['Интерфейс 2',1],['Интерфейс 3',2],['Интерфейс 4',3],['Интерфейс 5',4], ['Интерфейс концентратора',6]];
export const _br = [['Автоматически',0],['300',300],['600',600],['1200',1200],['2400',2400],['4800',4800],['9600',9600],['19200',19200],['38400',38400],['57600',57600],['115200',115200]];
export const _size = [['7',7],['8',8]];
export const _parity = ['Отсутствует','Контроль четности','Контроль нечетности'];
export const _stop = [['1',1],['2',2]];
export const _passType = ['RAW','ASCII','HEX'];
export class MeterSettingsTableService extends Fetch {
  constructor() {
    super('/settings/meter/table');
  }
  get type() {
    return _type.map(t => ({ id: t[1], name: t[0] }));
  }
  get line() {
    return _line.map((t, index) => ({ id: index, name: t }));
  }
  get iface() {
    return _iface.map(t => ({ id: t[1], name: t[0] }));
  }
  get br() {
    return _br.map(t => ({ id: t[1], name: t[0] }));
  }
  get size() {
    return _size.map(t => ({ id: t[1], name: t[0] }));
  }
  get parity() {
    return _parity.map((t, index) => ({ id: index, name: t }));
  }
  get stop() {
    return _stop.map(t => ({ id: t[1], name: t[0] }));
  }
  get passType () {
    return _passType.map((t, index) => ({ id: index, name: t }))
  }
  getData = (): Promise<MeterSettingsTable[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Meters }) => Meters?.map((sett: MeterSettingsTable) => {
        sett.type = (this.type.find(x => x.id === (sett.type as number))?.name) || 'нет данных';
        sett.iface = (this.iface.find(x => x.id === (sett.iface as number))?.name)  || 'нет данных';
        sett.line = (this.line.find(x => x.id === (sett.line as number))?.name)  || 'нет данных';
        sett.br = (this.br.find(x => x.id === (sett.br as number))?.name)  || 'нет данных';
        sett.size = (this.size.find(x => x.id === (sett.size as number))?.name)  || 'нет данных';
        sett.parity = (this.parity.find(x => x.id === (sett.parity as number))?.name)  || 'нет данных';
        sett.stop = (this.stop.find(x => x.id === (sett.stop as number))?.name)  || 'нет данных';
        sett.passType = _passType[0];
        return sett;
      }));
  }
  saveData(data: MeterSettingsTable[]): Promise<Response> {
    return super.save(
      {
        Meters: data.map((sett: MeterSettingsTable) => {
                      sett = {...sett};
                      sett.type = this.type.find((v: any) => v.name === (sett.type as string))?.id;
                      sett.type = !sett.type ? this.type[0].id : sett.type;
                      sett.iface = this.iface.find((v: any) => v.name === (sett.iface as string))?.id;
                      sett.iface = !sett.iface ? this.iface[0].id : sett.iface;
                      sett.line = this.line.find((v: any) => v.name === (sett.line as string))?.id;
                      sett.line = !sett.line ? this.line[0].id : sett.line;
                      sett.br = this.br.find((v: any) => v.name === (sett.br as string))?.id;
                      sett.br = !sett.br ? this.br[0].id : sett.br;
                      sett.size = this.size.find((v: any) => v.name === (sett.size as string))?.id;
                      sett.size = !sett.size ? this.size[0].id : sett.size;
                      sett.parity = this.parity.find((v: any) => v.name === (sett.parity as string))?.id;
                      sett.parity = !sett.parity ? this.parity[0].id : sett.parity;
                      sett.stop = this.stop.find((v: any) => v.name === (sett.stop as string))?.id;
                      sett.stop = !sett.stop ? this.stop[0].id : sett.stop;
                      sett.rtuObjType = Number(sett.rtuObjType || 0);
                      sett.rtuObjNum = Number(sett.rtuObjNum || 0);
                      sett.rtuFider = Number(sett.rtuFider || 0);
                      delete sett.passType;
                      return sett;
                  })
    });
  }
  clearData(): Promise<Response> {
    return super.clear();
  }
}