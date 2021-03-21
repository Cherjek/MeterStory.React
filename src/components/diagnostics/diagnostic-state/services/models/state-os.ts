export class StateOs {
  osname?: string;
  osruntime?: string;
  heapfree?: string;
  heapmin?: string;
  State?: StateOsState[];
}

// tslint:disable-next-line: max-classes-per-file
export class StateOsState {
  id?: number;
	name?: string;
	state?: number | string;
	priority?: string;
	stacksize?: string;
	stackfree?: string;
	stackmin?: string;
	runtime?: string;
}