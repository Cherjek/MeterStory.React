export class MeterSettingsTable {
  id?: number;
	pId?: number;
  archId?: number; 
	type?: number | string;
	addr?: string;
	passType?: number | string;
	passRd?: string;
	passWr?: string;
	iface?: number | string;
	line?: number | string;
	br?: number | string;
	size?: number | string;
	parity?: number | string;
	stop?: number | string;
	rtuObjType?: number;
	rtuObjNum?: number;
	rtuFider?: number;
}