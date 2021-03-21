import { Fetch } from '../../../../../core/service';
import { TagView } from '../../meter-data-info/services/models/TagView';
import { DataGridColumn, DataGridColumnType } from '../../../../common/data-grid/columns';

export class MeterDataCardFeaturesService extends Fetch {
  constructor() {
    super('/meter/data');
  }

  tagsView: TagView[] = [
    { code: 'TagPp', name: 'P+', checked: false },
    { code: 'TagPm', name: 'P-', checked: false },
    { code: 'TagQp', name: 'Q+', checked: false },
    { code: 'TagQm', name: 'Q-', checked: false },
    { code: 'TagFlags', name: 'Флаги', checked: false },
    { code: 'TagPls', name: 'Pls', checked: false },
    { code: 'TagChnl', name: 'Chnl', checked: false }
  ];

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
      code: 'Pp',
      name: 'P+,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'Pm',
      name: 'P-,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'Qp',
      name: 'Q+,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'Qm',
      name: 'Q-,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'isMeas',
      name: 'Наличие измерения',
      type: DataGridColumnType.String
    },
    {
      code: 'isSummer',
      name: 'Сезон:лето',
      type: DataGridColumnType.String
    },
    {
      code: 'isOvfl',
      name: 'Переполнение',
      type: DataGridColumnType.String
    },
    {
      code: 'isPart',
      name: 'Неполный срез',
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
    this.cons_tag_search(params);
    this.pulse_tag_search(params);
    this.channel_tag_search(params)
    if(time && time.length) {
      (params as any).time = time;
    }
    return super.set(params)
      .then((res) => res.json())
      .then(res => cons_response_parse(res));;
  }

  private getElementById = (tagCode: string) => {
    return this.tagsView.find(x => x.code === tagCode);
  }

  private channel_tag_search = (params) => {
    if ((this.getElementById('TagChnl')) && (this.getElementById('TagChnl').checked))
    {
      for (let i = 1; i <= 32; i++)
      {
        const Tag = 'Chnl' + i;
        params.tags.push(Tag);
      }
    }
  }

  private cons_tag_search(params) {
    if ((this.getElementById('TagPp')) && (this.getElementById('TagPp').checked))
    {
      params.tags.push('P+');
    }
    if ((this.getElementById('TagPm')) && (this.getElementById('TagPm').checked))
    {
      params.tags.push('P-');
    }
    if ((this.getElementById('TagQp')) && (this.getElementById('TagQp').checked))
    {
      params.tags.push('Q+');
    }
    if ((this.getElementById('TagQm')) && (this.getElementById('TagQm').checked))
    {
      params.tags.push('Q-');
    }
    if ((this.getElementById('TagFlags')) && (this.getElementById('TagFlags').checked))
    {
      params.tags.push('isMeas');
      params.tags.push('isSummer');
      params.tags.push('isOvfl');
      params.tags.push('isPart');
    }
  }

  private pulse_tag_search(params) {
    if ((this.getElementById('TagPls')) && (this.getElementById('TagPls').checked))
    {
      for (let i = 1; i <= 32; i++)
      {
        const Tag = 'Pls' + i;
        params.tags.push(Tag);
      }
    }
  }
}

function cons_response_parse(response) {
	const metersData: any[] = [];
	for (let i = 0; i < response.measures[0].devices.length; i++) {
		for (let j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			const meterData = {};
			meterData['id'] = response.measures[0].devices[i].id;
			meterData['serial'] = response.measures[0].devices[i].serial;
			meterData['time'] = response.measures[0].devices[i].vals[j].ts;
			meterData['timediff'] = response.measures[0].devices[i].vals[j].diff;
			for ( let k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'P+' )
					meterData['Pp'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'Q+' )
					meterData['Qp'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'P-' )
					meterData['Pm'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'Q-' )
					meterData['Qm'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isMeas' )
					meterData['isMeas'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isSummer' )
					meterData['isSummer'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isOvfl' )
					meterData['isOvfl'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'isPart' )
					meterData['isPart'] = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			metersData.push(meterData);
		}
	}
  return metersData;
}