import { Fetch } from '../../../../core/service';
export class TimeService extends Fetch {
  constructor(url?: string) {
    super(url ? url : '/meter/data');
  }
  getData = (idPu: number, measure: string): Promise<any[]> => {
    const params = {
      ids:[],
      measures:[]
    };
    params.ids.push(idPu);
    params.measures.push(measure);
    return super.set(params)
      .then((res) => res.json())
      .then((res) => measure === 'mTime' ? time_response_parse(res) : relay_response_parse(res));
  }
}

function time_response_parse(response) {
  const times = [];
	for (let i = 0; i < response.measures[0].devices.length; i++) {
		for (let j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			const time: any = {};
			time.id = response.measures[0].devices[i].id;
			time.serial = response.measures[0].devices[i].serial;
			time.time = response.measures[0].devices[i].vals[j].ts;
			time.timediff = response.measures[0].devices[i].vals[j].diff;
			times.push(time);
		}
  }
  return times;
}

function relay_response_parse(response) {
	const relays = [];
	for (let i = 0; i < response.measures[0].devices.length; i++) {
		for (let j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			const relay: any = {};
			relay.id = response.measures[0].devices[i].id;
			relay.serial = response.measures[0].devices[i].serial;
			relay.time = response.measures[0].devices[i].vals[j].ts;
			relay.timediff = response.measures[0].devices[i].vals[j].diff;
			for ( let k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'relayId' )
          relay.rId = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == 'relayState' )
          relay.state = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			relays.push(relay);
		}
  }
  return relays;
}