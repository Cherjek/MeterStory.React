import { ICallbackColumnService } from './icallback-service';

export class DataGridColumn {
  code!: string;
  name!: string;
  type!: DataGridColumnType;
  width?: number;
  defVal?: any;
  disabledRules?: DisabledRules;
  inputRules?: InputRules[];
}
export class DisabledRules {
  field!: string;
  val!: any;
}
export class InputRules {
  fieldDependOn?: string;
  valDependOn?: any | any[];
  ruleRegex: any;
}
export class DataGridComboboxColumn extends DataGridColumn {
  values!: any[];
}
export class DataGridComboboxColumnCallback extends DataGridComboboxColumn {
  parent?: string;
  child?: string | string[];
  source?: DataGridComboboxSource;
}
export class DataGridComboboxSource {
  service!: ICallbackColumnService;
  constructor(s: ICallbackColumnService) {
    this.service = s;
  }
}
export enum DataGridColumnType {
  String,
  Int,
  Decimal,
  Bool,
  Date,
  DateTime,
  Combobox
}