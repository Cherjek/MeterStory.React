import React from 'react';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import './current-data-info.scss';

const CurrentDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'mEng',
        tableHeader: 'Показания энергии',
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default CurrentDataInfo;
