export class Time {
  time?: string;
	settime?: string;
  sync?: boolean;
  extRTC?: ExtRTC;
  intRTC?: IntRTC;
}

export class IntRTC {
  time?: string;
}

export class ExtRTC {
  type?: string;
	time?: string;
	temperature?: string;
	osc?: boolean;
	verify?: boolean;
}