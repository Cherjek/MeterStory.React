import { Fetch } from '../../../../../core/service';
import { TagView } from './models/TagView';
import { DataGridColumn, DataGridColumnType } from '../../../../common/data-grid/columns';

export class MeterDataInfoService extends Fetch {
  constructor() {
    super('/meter/data');
  }

  tagsView: TagView[] = [
    { code: 'TagAp', name: 'A+', checked: false },
    { code: 'TagAm', name: 'A-', checked: false },
    { code: 'TagRp', name: 'R+', checked: false },
    { code: 'TagRm', name: 'R-', checked: false },
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
      code: 'Ap0',
      name: 'A+0,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Ap1',
      name: 'A+1,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Ap2',
      name: 'A+2,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Ap3',
      name: 'A+3,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Ap4',
      name: 'A+4,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Am0',
      name: 'A-0,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Am1',
      name: 'A-1,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Am2',
      name: 'A-2,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Am3',
      name: 'A-3,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Am4',
      name: 'A-4,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rp0',
      name: 'R+0,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rp1',
      name: 'R+1,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rp2',
      name: 'R+2,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rp3',
      name: 'R+3,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rp4',
      name: 'R+4,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rm0',
      name: 'R-0,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rm1',
      name: 'R-1,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rm2',
      name: 'R-2,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rm3',
      name: 'R-3,Вт*ч',
      type: DataGridColumnType.String
    },
    {
      code: 'Rm4',
      name: 'R-4,Вт*ч',
      type: DataGridColumnType.String
    },
  ];
  
  getData = (measureCode: string, idPu?: number, time?: Array<{start: string, end: string}>) => {
    const params = {
      ids:[],
      tags:[],
      measures:[]
    };
    if (idPu != null) {
      params.ids.push(idPu);
    }
    params.measures.push(measureCode);
    this.energy_tag_search(params);
    this.pulse_tag_search(params);
    this.channel_tag_search(params)
    if(time && time.length) {
      (params as any).time = time;
    }
    return super.set(params)
      .then((res) => res.json())
      .then((res) => energy_response_parse(res));
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

  private pulse_tag_search = (params) => {
    if ((this.getElementById('TagPls')) && (this.getElementById('TagPls').checked))
    {
      for (let i = 1; i <= 32; i++)
      {
        const Tag = 'Pls' + i;
        params.tags.push(Tag);
      }
    }
  }

  private energy_tag_search = (params) => {
    if ((this.getElementById('TagAp')) && (this.getElementById('TagAp').checked))
    {
      for (let i = 0; i <= 4; i++)
      {
        const Tag = 'A+' + i;
        params.tags.push(Tag);
      }
    }
    if ((this.getElementById('TagAm')) && (this.getElementById('TagAm').checked))
    {
      for (let i = 0; i <= 4; i++)
      {
        const Tag = 'A-' + i;
        params.tags.push(Tag);
      }
    }
    if ((this.getElementById('TagRp')) && (this.getElementById('TagRp').checked))
    {
      for (let i = 0; i <= 4; i++)
      {
        const Tag = 'R+' + i;
        params.tags.push(Tag);
      }
    }
    if ((this.getElementById('TagRm')) && (this.getElementById('TagRm').checked))
    {
      for (let i = 0; i <= 4; i++)
      {
        const Tag = 'R-' + i;
        params.tags.push(Tag);
      }
    }
  }
}

function energy_response_parse(response) {
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
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A+0' )
					meterData['Ap0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A+1' )
					meterData['Ap1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A+2' )
					meterData['Ap2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A+3' )
					meterData['Ap3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A+4' )
					meterData['Ap4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A-0' )
					meterData['Am0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A-1' )
					meterData['Am1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A-2' )
					meterData['Am2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A-3' )
					meterData['Am3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'A-4' )
					meterData['Am4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R+0' )
					meterData['Rp0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R+1' )
					meterData['Rp1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R+2' )
					meterData['Rp2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R+3' )
					meterData['Rp3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R+4' )
					meterData['Rp4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R-0' )
					meterData['Rm0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R-1' )
					meterData['Rm1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R-2' )
					meterData['Rm2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R-3' )
					meterData['Rm3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'R-4' )
					meterData['Rm4'] = response.measures[0].devices[i].vals[j].tags[k].val;

				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls1' )
					meterData['Ap0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls2' )
					meterData['Ap1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls3' )
					meterData['Ap2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls4' )
					meterData['Ap3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls5' )
					meterData['Ap4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls6' )
					meterData['Am0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls7' )
					meterData['Am1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls8' )
					meterData['Am2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls9' )
					meterData['Am3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls10' )
					meterData['Am4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls11' )
					meterData['Rp0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls12' )
					meterData['Rp1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls13' )
					meterData['Rp2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls14' )
					meterData['Rp3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls15' )
					meterData['Rp4'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls16' )
					meterData['Rm0'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls17' )
					meterData['Rm1'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls18' )
					meterData['Rm2'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls19' )
					meterData['Rm3'] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === 'Pls20' )
					meterData['Rm4'] = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			metersData.push(meterData);
		}
  }
  return metersData;
}