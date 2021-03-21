import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const DayDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aDay',
        showDuration: true,
        tableHeader: 'Показания на начало суток',
        groupsPu: [_groupsTypeMeterDictionary[0],_groupsTypeMeterDictionary[1]]
      }}
    />
  );
};

export default DayDataInfo;
