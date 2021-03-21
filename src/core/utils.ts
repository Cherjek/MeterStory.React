export class Utils {
  static parseId = (value: string) => {
    const values = value.split(',');
    return values[0].replace('id: ', '');
  }
  static compareId = (val1: string, val2: string) => {
    return Utils.parseId(val1) == val2;
  }
}