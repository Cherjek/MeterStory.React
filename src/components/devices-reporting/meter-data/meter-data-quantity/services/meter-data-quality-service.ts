import { Fetch } from '../../../../../core/service';
import { TagView } from '../../meter-data-info/services/models/TagView';
import { DataGridColumn, DataGridColumnType } from '../../../../common/data-grid/columns';

export class MeterDataQualityService extends Fetch {
  constructor() {
    super('/meter/data');
  }

  tagsView: TagView[] = [
    { code: 'TagU', name: 'U', checked: false },
    { code: 'TagI', name: 'I', checked: false },
    { code: 'TagP', name: 'P', checked: false },
    { code: 'TagQ', name: 'Q', checked: false },
    { code: 'TagS', name: 'S', checked: false },
    { code: 'TagAng', name: 'Ang', checked: false },
    { code: 'TagkP', name: 'kP', checked: false },
    { code: 'TagFreq', name: 'Freq', checked: false }
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
      code: 'UA',
      name: 'U0,В',
      type: DataGridColumnType.String
    },
    {
      code: 'UB',
      name: 'U1,В',
      type: DataGridColumnType.String
    },
    {
      code: 'UC',
      name: 'U2,В',
      type: DataGridColumnType.String
    },
    {
      code: 'IA',
      name: 'I0,A',
      type: DataGridColumnType.String
    },
    {
      code: 'IB',
      name: 'I1,A',
      type: DataGridColumnType.String
    },
    {
      code: 'IC',
      name: 'I2,A',
      type: DataGridColumnType.String
    },
    {
      code: 'PS',
      name: 'P0,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'PA',
      name: 'P1,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'PB',
      name: 'P2,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'PC',
      name: 'P3,Вт',
      type: DataGridColumnType.String
    },
    {
      code: 'QS',
      name: 'Q0,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'QA',
      name: 'Q1,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'QB',
      name: 'Q2,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'QC',
      name: 'Q3,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'SS',
      name: 'S0,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'SA',
      name: 'S1,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'SB',
      name: 'S2,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'SC',
      name: 'S3,ВАр',
      type: DataGridColumnType.String
    },
    {
      code: 'AngAB',
      name: 'Ang0',
      type: DataGridColumnType.String
    },
    {
      code: 'AngBC',
      name: 'Ang1',
      type: DataGridColumnType.String
    },
    {
      code: 'AngAC',
      name: 'Ang2',
      type: DataGridColumnType.String
    },
    {
      code: 'kPS',
      name: 'kP0',
      type: DataGridColumnType.String
    },
    {
      code: 'kPA',
      name: 'kP1',
      type: DataGridColumnType.String
    },
    {
      code: 'kPB',
      name: 'kP2',
      type: DataGridColumnType.String
    },
    {
      code: 'kPC',
      name: 'kP3',
      type: DataGridColumnType.String
    },
    {
      code: 'Freq',
      name: 'Freq,Гц',
      type: DataGridColumnType.String
    }
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
    this.quality_tag_search(params);
    if(time && time.length) {
      (params as any).time = time;
    }
    return super.set(params)
      .then((res) => res.json())
      .then(res => quality_response_parse(res));;
  }

  private getElementById = (tagCode: string) => {
    return this.tagsView.find(x => x.code === tagCode);
  }

  private quality_tag_search(params) {
    if ((this.getElementById('TagU')) && (this.getElementById('TagU').checked))
    {
      params.tags.push('UA');
      params.tags.push('UB');
      params.tags.push('UC');
    }
    if ((this.getElementById('TagI')) && (this.getElementById('TagI').checked))
    {
      params.tags.push('IA');
      params.tags.push('IB');
      params.tags.push('IC');
    }
    if ((this.getElementById('TagP')) && (this.getElementById('TagP').checked))
    {
      params.tags.push('PS');
      params.tags.push('PA');
      params.tags.push('PB');
      params.tags.push('PC');
    }
    if ((this.getElementById('TagQ')) && (this.getElementById('TagQ').checked))
    {
      params.tags.push('QS');
      params.tags.push('QA');
      params.tags.push('QB');
      params.tags.push('QC');
    }
    if ((this.getElementById('TagS')) && (this.getElementById('TagS').checked))
    {
      params.tags.push('SS');
      params.tags.push('SA');
      params.tags.push('SB');
      params.tags.push('SC');
    }
    if ((this.getElementById('TagAng')) && (this.getElementById('TagAng').checked))
    {
      params.tags.push('AngAB');
      params.tags.push('AngBC');
      params.tags.push('AngAC');
    }
    if ((this.getElementById('TagkP')) && (this.getElementById('TagkP').checked))
    {
      params.tags.push('kPS');
      params.tags.push('kPA');
      params.tags.push('kPB');
      params.tags.push('kPC');
    }
    if ((this.getElementById('TagFreq')) && (this.getElementById('TagFreq').checked))
    {
      params.tags.push('Freq');
    }
  }
}

function quality_response_parse(response) {
	const metersData: any[] = [];
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			const meterData = {};
			meterData["id"] = response.measures[0].devices[i].id;
			meterData["serial"] = response.measures[0].devices[i].serial;
			meterData["time"] = response.measures[0].devices[i].vals[j].ts;
			meterData["timediff"] = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "UA" )
					meterData["UA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "UB" )
					meterData["UB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "UC" )
					meterData["UC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "IA" )
					meterData["IA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "IB" )
					meterData["IB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "IC" )
					meterData["IC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "PS" )
					meterData["PS"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "PA" )
					meterData["PA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "PB" )
					meterData["PB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "PC" )
					meterData["PC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "QS" )
					meterData["QS"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "QA" )
					meterData["QA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "QB" )
					meterData["QB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "QC" )
					meterData["QC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "SS" )
					meterData["SS"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "SA" )
					meterData["SA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "SB" )
					meterData["SB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "SC" )
					meterData["SC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "AngAB" )
					meterData["AngAB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "AngBC" )
					meterData["AngBC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "AngAC" )
					meterData["AngAC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "kPS" )
					meterData["kPS"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "kPA" )
					meterData["kPA"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "kPB" )
					meterData["kPB"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "kPC" )
					meterData["kPC"] = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag === "Freq" )
					meterData["Freq"] = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			metersData.push(meterData);
		}
  }
  return metersData;
}