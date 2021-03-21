import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import { PulsMetersDataService } from './services/puls-meters-data-service';

const PlsDayDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aDay',
        showDuration: true,
        tableHeader: 'Показания на начало суток',
        service: PulsMetersDataService,
        groupsPu: [_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default PlsDayDataInfo;
