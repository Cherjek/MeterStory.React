import React from 'react';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { PulsMetersDataService } from './services/puls-meters-data-service';

const PlsSliceDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aEng',
        tableHeader: 'Срезы показаний',
        service: PulsMetersDataService,
        groupsPu: [_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default PlsSliceDataInfo;
