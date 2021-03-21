class OrderBy {
  transform(array: any[], orderBy: string, asc = true, objKeys: string[] = [], isDateTime?: boolean) {
    if (!array || (!orderBy || orderBy.trim() === '')) {
      return array;
    }

    if (array.length && this.isObject(array[0][orderBy]) && objKeys.length) {
      array = this.constructTempKey(array, orderBy, objKeys);
      orderBy = 'temp';
    }

    if (isDateTime) {
      this.orderByComparator = this.orderByDateTimeComparator;
    }

    //ascending
    if (asc) {
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item1[orderBy], item2[orderBy]);
      });
    } else {
      //not asc
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item2[orderBy], item1[orderBy]);
      });
    }
  }

  orderByDateTimeComparator(a: string | Date, b: string | Date) {
    // for DateTime compare
    const ds = new Date(a).getTime();
    const de = new Date(b).getTime();
    if (!isNaN(ds) && !isNaN(de)) {
      if (ds < de) {
        return -1;
      } else if (ds > de) {
        return 1;
      }
    }
    return 0;
  }

  orderByComparator(a: any, b: any): number {
    if (a == null) {
      return -1;
    } else if (b == null) {
      return 1;
    } else if (typeof (a) === 'string' && typeof (b) === 'string') {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      //Isn't a number so lowercase the string to properly compare
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
    } else {
      //Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }
    return 0; //equal each other
  }

  private constructTempKey(data: Array<any>, orderBy: string, objKeys: any[]) {
    const innerObjects = data.map(x => x[orderBy]);
    if (objKeys.length === 1) {
      return data.map(obj => {
        obj.temp = obj[orderBy][objKeys[0]];
        return obj;
      });
    }
    const keyValsConcat = objKeys.reduce((x, y) => innerObjects.map(obj => obj[x] + obj[y]));
    return data.map((obj, i) => {
      obj.temp = keyValsConcat[i];
      return obj;
    });
  }

  private isObject(obj: object) {
      return obj != null && obj.constructor.name === 'Object';
  }
}

export default OrderBy;