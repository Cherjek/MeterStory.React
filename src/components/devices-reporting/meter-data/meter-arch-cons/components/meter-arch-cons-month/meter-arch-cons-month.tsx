import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const MeterArchConsMonth = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aMonthCons',
        showDuration: true,
        tableHeader: 'Потребление за месяц',
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default MeterArchConsMonth;
