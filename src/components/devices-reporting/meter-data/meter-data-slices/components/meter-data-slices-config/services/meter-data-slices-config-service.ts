import { Fetch } from '../../../../../../../core/service';
import { TagView } from '../../../../meter-data-info/services/models/TagView';
import { DataGridColumn, DataGridColumnType } from '../../../../../../common/data-grid/columns';

export class MeterDataSlicesConfigService extends Fetch {
  constructor() {
    super('/meter/data');
  }

  tagsView: TagView[] = [];

  columns: DataGridColumn[] = [
    {
      code: 'id',
      name: 'ID',
      type: DataGridColumnType.String
    },
    {
      code: 'serial',
      name: 'Серийный номер',
      type: DataGridColumnType.String
    },
    {
      code: 'time',
      name: 'Метка времени',
      type: DataGridColumnType.String
    },
    {
      code: 'timediff',
      name: 'Расхождение времени',
      type: DataGridColumnType.String
    },
    {
      code: 'kU',
      name: 'К. трансф. по току',
      type: DataGridColumnType.String
    },
    {
      code: 'kI',
      name: 'К. трансф. по напряжению',
      type: DataGridColumnType.String
    },
    {
      code: 'Const',
      name: 'Постоянная счетчика',
      type: DataGridColumnType.String
    },
    {
      code: 'cTime',
      name: 'Наличие часов',
      type: DataGridColumnType.String
    },
    {
      code: 'isDst',
      name: 'Наличие тарификатора',
      type: DataGridColumnType.String
    },
    {
      code: 'isCons',
      name: 'Разрешение смены сезона',
      type: DataGridColumnType.String
    },
    {
      code: 'isClock',
      name: 'Поддержка реактивной энергии',
      type: DataGridColumnType.String
    },
    {
      code: 'isTrf',
      name: 'Поддержка обратной активной энергии',
      type: DataGridColumnType.String
    },
    {
      code: 'isAm',
      name: 'Поддержка обратной реактивной энергии',
      type: DataGridColumnType.String
    },
    {
      code: 'isRm',
      name: 'Поддержка профилей мощности',
      type: DataGridColumnType.String
    },
    {
      code: 'isRp',
      name: 'Период интегрирования,мин',
      type: DataGridColumnType.String
    }
  ];

  getData = (measureCode: string, idPu?: number, time?: {start: string, end: string}[]) => {
    const params = {
      ids:[],
      tags:[],
      measures:[]
    };
    if (idPu != null) {
      params.ids.push(idPu);
    }
    params.measures.push(measureCode);
    this.configTagSearch(params);
    if(time && time.length) {
      (params as any).time = time;
    }
    return super.set(params)
      .then((res) => res.json())
      .then(res => config_response_parse(res));;
  }

  private configTagSearch = (params) => {
    let Tag = 'kU';
    params.tags.push(Tag);
    Tag = 'kI';
    params.tags.push(Tag);
    Tag = 'Const';
    params.tags.push(Tag);
    Tag = 'cTime';
    params.tags.push(Tag);
    Tag = 'isDst';
    params.tags.push(Tag);
    Tag = 'isCons';
    params.tags.push(Tag);
    Tag = 'isClock';
    params.tags.push(Tag);
    Tag = 'isTrf';
    params.tags.push(Tag);
    Tag = 'isAm';
    params.tags.push(Tag);
    Tag = 'isRm';
    params.tags.push(Tag);
    Tag = 'isRp';
    params.tags.push(Tag);
  }
}

function config_response_parse(response) {
	const metersData: any[] = [];
	for (let i = 0; i < response.measures[0].devices.length; i++) {
		for (let j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			const meterData = {};
			meterData['id'] = response.measures[0].devices[i].id;
			meterData['serial'] = response.measures[0].devices[i].serial;
			meterData['time'] = response.measures[0].devices[i].vals[j].ts;
			meterData['timediff'] = response.measures[0].devices[i].vals[j].diff;
			for (let k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'kU' )
					meterData['kU'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'kI' )
					meterData['kI'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'Const' )
					meterData['Const'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'cTime' )
					meterData['cTime'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isDst' )
					meterData['isDst'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isCons' )
					meterData['isCons'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isClock' )
					meterData['isClock'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isTrf' )
					meterData['isTrf'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isAm' )
					meterData['isAm'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isRm' )
					meterData['isRm'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isRp' )
					meterData['isRp'] = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			metersData.push(meterData);
		}
  }
  return metersData;
}