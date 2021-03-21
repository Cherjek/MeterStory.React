import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { PulsMetersDataService } from './services/puls-meters-data-service';

const PlsMonthDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aMonth',
        showDuration: true,
        tableHeader: 'Показания на начало месяца',
        service: PulsMetersDataService,
        groupsPu: [_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default PlsMonthDataInfo;
