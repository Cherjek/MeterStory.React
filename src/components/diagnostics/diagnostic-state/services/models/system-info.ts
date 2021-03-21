export class SystemInfo {
  fw: string;
  bl: string;
  MODEL: string;
  MAC: string;
  IF: IF[];
  MAIN_PWR: string;
  DF: IF[];
  BAT: string;
  SN: string;
  MODEM: string;
  DATE: string;
  REV: string;
}

class IF {
  NUM: number;
  TYPE: string;
}
