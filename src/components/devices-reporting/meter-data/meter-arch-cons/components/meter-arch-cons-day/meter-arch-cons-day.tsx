import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const MeterArchConsDay = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aDayCons',
        showDuration: true,
        tableHeader: 'Потребление за сутки',
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default MeterArchConsDay;
